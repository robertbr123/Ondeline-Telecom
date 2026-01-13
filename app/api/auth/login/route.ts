import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from '@/lib/db'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    console.log('🔐 Login attempt for user:', username)

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Usuário e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar usuário no banco
    const result = await query('SELECT * FROM admin_users WHERE username = $1', [username])
    const user = result.rows[0] as any

    console.log('🔍 User found:', user ? 'Yes' : 'No')

    if (!user) {
      console.log('❌ User not found in database')
      return NextResponse.json(
        { success: false, error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Verificar senha
    console.log('🔑 Comparing password...')
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    console.log('🔑 Password valid:', isValidPassword)

    if (!isValidPassword) {
      console.log('❌ Invalid password')
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

    // Criar token JWT
    const token = jwt.sign(
      { username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

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
    
    console.log('🍪 Setting cookie with secure:', isSecure)
    
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    })

    console.log('✅ Login successful, cookie set')

    return response
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
