import { NextResponse } from 'next/server'
import pool from '@/lib/db'

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
  } catch {
    health.database = 'error'
    health.status = 'degraded'
  }

  return NextResponse.json(health)
}
