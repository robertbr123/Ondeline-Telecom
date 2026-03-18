import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { query } from '@/lib/db'
import { authLogger } from '@/lib/logger'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    authLogger.info({ username }, 'Login attempt')

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Usuário e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar usuário no banco
    const result = await query('SELECT * FROM admin_users WHERE username = $1', [username])
    const user = result.rows[0] as any

    if (!user) {
      authLogger.warn({ username }, 'Login failed: user not found')
      return NextResponse.json(
        { success: false, error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      authLogger.warn({ username }, 'Login failed: invalid password')
      return NextResponse.json(
        { success: false, error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Atualizar último login
    await query('UPDATE admin_users SET last_login = $1 WHERE username = $2', [
      new Date().toISOString(),
      username
    ])

    // Criar token JWT usando jose (compatível com Edge Runtime)
    const token = await new SignJWT({ username: user.username, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(JWT_SECRET)

    // Definir cookie
    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          username: user.username,
          role: user.role,
        },
        token,
      },
    })

    // Configurar cookie
    // NOTA: secure deve ser false quando usando proxy reverso (Traefik)
    // que termina HTTPS externamente mas usa HTTP internamente
    const isSecure = false // Temporariamente desativado para funcionar com proxy

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    })

    authLogger.info({ username }, 'Login successful')

    return response
  } catch (error) {
    authLogger.error({ err: error }, 'Login error')
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
