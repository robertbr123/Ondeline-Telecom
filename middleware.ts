import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'
)

// Rotas públicas que não exigem autenticação
const publicRoutes = [
  '/admin/login',
  '/api/auth/login',
  '/api/auth/debug',
  '/api/leads',
  '/api/faq',
  '/api/plans',
  '/api/site/config',
]

// Extensões de arquivos estáticos
const staticExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.ico', '.gif', '.webp', '.css', '.js']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir rotas públicas
  if (
    publicRoutes.some(route => pathname.startsWith(route)) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/public') ||
    pathname === '/' ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/coverage') ||
    staticExtensions.some(ext => pathname.includes(ext))
  ) {
    return NextResponse.next()
  }

  // Proteger rotas de admin
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
