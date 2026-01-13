import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// Endpoint temporário para debug - REMOVER EM PRODUÇÃO
export async function GET() {
  try {
    // Verificar se existem usuários admin
    const result = await query('SELECT username, role, created_at, last_login FROM admin_users')
    const users = result.rows

    return NextResponse.json({
      success: true,
      message: 'Debug info',
      adminUsersCount: users.length,
      users: users.map((u: any) => ({
        username: u.username,
        role: u.role,
        created_at: u.created_at,
        last_login: u.last_login
      })),
      env: {
        ADMIN_USERNAME: process.env.ADMIN_USERNAME || '(not set)',
        ADMIN_PASSWORD_HASH_SET: !!process.env.ADMIN_PASSWORD_HASH,
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL_SET: !!process.env.DATABASE_URL
      }
    })
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 })
  }
}
