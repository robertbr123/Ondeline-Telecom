// app/api/detector/route.ts
import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import pool from '@/lib/db'
import { apiLogger } from '@/lib/logger'
import { DETECTOR_SERVICES, type DetectorService } from '@/lib/detector-services'

export const dynamic = 'force-dynamic'

type Status = 'operational' | 'degraded' | 'down'

interface ServiceResult {
  name: string
  domain: string
  category: string
  status: Status
  responseTime: number | null
  lastCheck: string
}

const CACHE_TTL_MS = 60_000
let cache: { at: number; payload: any } | null = null
let tableReady = false

async function ensureTable(): Promise<void> {
  if (tableReady || !pool) return
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS external_status_checks (
        id SERIAL PRIMARY KEY,
        service TEXT NOT NULL,
        status TEXT NOT NULL,
        response_time INTEGER,
        checked_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `)
    await query(
      `CREATE INDEX IF NOT EXISTS idx_external_status_service_time
       ON external_status_checks (service, checked_at DESC)`
    )
    tableReady = true
  } catch {
    // DDL falhou; tableReady permanece false para tentar novamente na próxima request
  }
}

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

async function checkService(svc: DetectorService): Promise<ServiceResult> {
  const start = Date.now()
  const base = {
    name: svc.name,
    domain: svc.domain,
    category: svc.category,
    lastCheck: new Date().toISOString(),
  }
  try {
    const res = await fetch(svc.checkUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': BROWSER_UA, Accept: 'text/html,*/*' },
      signal: AbortSignal.timeout(6000),
      cache: 'no-store',
    })
    const elapsed = Date.now() - start
    // Respondeu: 2xx/3xx = ok; 4xx/5xx = degradado (site no ar mas com problema/bloqueio)
    const ok = res.status < 400
    const status: Status = ok ? (elapsed > 2500 ? 'degraded' : 'operational') : 'degraded'
    return { ...base, status, responseTime: elapsed }
  } catch {
    return { ...base, status: 'down', responseTime: null }
  }
}

export async function GET() {
  try {
    if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
      return NextResponse.json(cache.payload)
    }

    await ensureTable()

    const settled = await Promise.allSettled(DETECTOR_SERVICES.map(checkService))
    const results: ServiceResult[] = settled.map((s, i) =>
      s.status === 'fulfilled'
        ? s.value
        : {
            name: DETECTOR_SERVICES[i].name,
            domain: DETECTOR_SERVICES[i].domain,
            category: DETECTOR_SERVICES[i].category,
            status: 'down' as Status,
            responseTime: null,
            lastCheck: new Date().toISOString(),
          }
    )

    // Persistir checagens (best-effort)
    const now = new Date().toISOString()
    for (const r of results) {
      await query(
        `INSERT INTO external_status_checks (service, status, response_time, checked_at)
         VALUES ($1, $2, $3, $4)`,
        [r.name, r.status, r.responseTime, now]
      ).catch(() => {})
    }

    // Limpeza best-effort de histórico antigo (> 7 dias)
    await query(
      `DELETE FROM external_status_checks WHERE checked_at < now() - interval '7 days'`
    ).catch(() => {})

    // Histórico das últimas 24h (para uptime% e sparkline)
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const hist = await query(
      `SELECT service, status, response_time, checked_at
       FROM external_status_checks
       WHERE checked_at >= $1
       ORDER BY checked_at ASC`,
      [since]
    ).catch(() => ({ rows: [] as any[] }))

    const byService: Record<string, { status: Status; responseTime: number | null }[]> = {}
    for (const row of hist.rows as any[]) {
      ;(byService[row.service] ||= []).push({
        status: row.status,
        responseTime: row.response_time,
      })
    }

    const services = results.map((r) => {
      const rows = byService[r.name] || [{ status: r.status, responseTime: r.responseTime }]
      const up = rows.filter((x) => x.status === 'operational').length
      const uptime = rows.length > 0 ? Math.round((up / rows.length) * 1000) / 10 : 100
      // Sparkline: últimos 24 pontos
      const history = rows.slice(-24).map((x) => ({ status: x.status, responseTime: x.responseTime }))
      return {
        name: r.name,
        domain: r.domain,
        category: r.category,
        status: r.status,
        responseTime: r.responseTime,
        uptime,
        history,
        lastCheck: r.lastCheck,
      }
    })

    const anyDown = services.some((s) => s.status === 'down')
    const allOperational = services.every((s) => s.status === 'operational')
    const overall: Status = anyDown ? 'down' : allOperational ? 'operational' : 'degraded'

    const payload = {
      success: true,
      data: { overall, lastUpdated: now, services },
    }
    cache = { at: Date.now(), payload }
    return NextResponse.json(payload)
  } catch (error) {
    apiLogger.error({ err: error }, 'Detector check failed')
    return NextResponse.json({ success: false, error: 'Falha ao verificar serviços' }, { status: 500 })
  }
}
