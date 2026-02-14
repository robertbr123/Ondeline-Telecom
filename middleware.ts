import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'
)

// Rotas públicas que não exigem autenticação
const PUBLIC_ROUTES = [
  '/admin/login',
  '/api/auth/login',
  '/api/leads',
  '/api/faq',
  '/api/plans',
  '/api/site/config',
  '/api/coverage',
  '/api/blog',
  '/api/features',
  '/api/referrals',
] as const

// Rotas públicas do site
const PUBLIC_PAGES = [
  '/',
  '/blog',
  '/coverage',
  '/ipixuna',
  '/eirunepe',
  '/itamarati',
  '/carauari',
] as const

// Extensões de arquivos estáticos
const STATIC_EXTENSIONS = [
  '.png', '.jpg', '.jpeg', '.svg', '.ico', '.gif', '.webp',
  '.css', '.js', '.woff', '.woff2', '.ttf', '.eot', '.json'
] as const

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir arquivos estáticos e Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/public') ||
    STATIC_EXTENSIONS.some(ext => pathname.endsWith(ext))
  ) {
    return NextResponse.next()
  }

  // Permitir rotas públicas do site
  if (PUBLIC_PAGES.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next()
  }

  // Permitir rotas públicas de API
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Proteger rotas de admin e APIs privadas
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
    } catch {
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
  // Middleware só roda em rotas /admin e /api - ignora páginas públicas, assets, etc.
  matcher: ['/admin/:path*', '/api/:path*'],
}
