import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import pool from '@/lib/db'
import { apiLogger } from '@/lib/logger'

interface ServiceCheck {
  service: string
  status: 'operational' | 'degraded' | 'down'
  responseTime: number | null
  lastCheck: string
}

async function checkDatabase(): Promise<ServiceCheck> {
  const start = Date.now()
  try {
    if (!pool) throw new Error('No pool')
    await pool.query('SELECT 1')
    return {
      service: 'Banco de Dados',
      status: 'operational',
      responseTime: Date.now() - start,
      lastCheck: new Date().toISOString(),
    }
  } catch {
    return {
      service: 'Banco de Dados',
      status: 'down',
      responseTime: null,
      lastCheck: new Date().toISOString(),
    }
  }
}

async function checkAPI(): Promise<ServiceCheck> {
  const start = Date.now()
  try {
    // Self-check the health endpoint
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/health`, {
      signal: AbortSignal.timeout(5000),
    })
    const elapsed = Date.now() - start
    return {
      service: 'API / Servidor Web',
      status: res.ok ? (elapsed > 2000 ? 'degraded' : 'operational') : 'degraded',
      responseTime: elapsed,
      lastCheck: new Date().toISOString(),
    }
  } catch {
    return {
      service: 'API / Servidor Web',
      status: 'down',
      responseTime: null,
      lastCheck: new Date().toISOString(),
    }
  }
}

export async function GET() {
  try {
    // Run live checks
    const [dbCheck, apiCheck] = await Promise.all([
      checkDatabase(),
      checkAPI(),
    ])

    const services = [apiCheck, dbCheck]

    // Save checks to database
    const now = new Date().toISOString()
    for (const svc of services) {
      await query(
        `INSERT INTO uptime_checks (service, status, response_time, checked_at)
         VALUES ($1, $2, $3, $4)`,
        [svc.service, svc.status, svc.responseTime, now]
      ).catch(() => {})
    }

    // Get uptime history (last 24h)
    const historyResult = await query(
      `SELECT service, status, response_time, checked_at
       FROM uptime_checks
       WHERE checked_at >= $1
       ORDER BY checked_at DESC`,
      [new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()]
    ).catch(() => ({ rows: [] }))

    // Calculate uptime percentages per service
    const uptimeByService: Record<string, { total: number; up: number }> = {}
    for (const row of historyResult.rows as any[]) {
      if (!uptimeByService[row.service]) {
        uptimeByService[row.service] = { total: 0, up: 0 }
      }
      uptimeByService[row.service].total++
      if (row.status === 'operational') {
        uptimeByService[row.service].up++
      }
    }

    const uptimePercentages: Record<string, number> = {}
    for (const [service, counts] of Object.entries(uptimeByService)) {
      uptimePercentages[service] = counts.total > 0
        ? Math.round((counts.up / counts.total) * 1000) / 10
        : 100
    }

    // Overall status
    const allOperational = services.every(s => s.status === 'operational')
    const anyDown = services.some(s => s.status === 'down')

    return NextResponse.json({
      success: true,
      data: {
        overall: anyDown ? 'down' : allOperational ? 'operational' : 'degraded',
        services,
        uptime: uptimePercentages,
        lastUpdated: now,
      },
    })
  } catch (error) {
    apiLogger.error({ err: error }, 'Status check failed')
    return NextResponse.json(
      { success: false, error: 'Status check failed' },
      { status: 500 }
    )
  }
}
