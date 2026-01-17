import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'
)

// Rotas públicas que não exigem autenticação
const publicRoutes = [
  '/',
  '/admin/login',
  '/api/auth/login',
  '/api/auth/debug',
  '/api/leads',
  '/api/faq',
  '/api/plans',
  '/api/site/config',
  '/blog',
  '/coverage',
]

// Prefixos de arquivos estáticos e Next.js
const staticPrefixes = [
  '/_next',
  '/static',
  '/favicon',
  '/public',
]

// Extensões de arquivos estáticos
const staticExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.ico', '.gif', '.webp', '.css', '.js']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Verificar se é uma rota pública
  const isPublicRoute = publicRoutes.some(route =>
    route === '/' ? pathname === '/' : pathname.startsWith(route)
  )

  // 2. Verificar se é um arquivo estático ou recurso do Next.js
  const isStaticResource =
    staticPrefixes.some(prefix => pathname.startsWith(prefix)) ||
    staticExtensions.some(ext => pathname.endsWith(ext))

  if (isPublicRoute || isStaticResource) {
    return NextResponse.next()
  }

  // 3. Proteger rotas de admin e API (exceto as públicas já verificadas)
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { success: false, error: 'Não autorizado' },
          { status: 401 }
        )
      }
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch (error) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { success: false, error: 'Token inválido' },
          { status: 401 }
        )
      }
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
