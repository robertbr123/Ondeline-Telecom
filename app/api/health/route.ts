import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { apiLogger } from '@/lib/logger'

export async function GET() {
  const health: { status: string; timestamp: string; database: string } = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'disconnected',
  }

  try {
    if (pool) {
      await pool.query('SELECT 1')
      health.database = 'connected'
    }
  } catch (error) {
    health.database = 'error'
    health.status = 'degraded'
    apiLogger.error({ err: error }, 'Health check: database error')
  }

  return NextResponse.json(health)
}
