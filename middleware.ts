import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// Sem NEXTAUTH_SECRET em produção não há login: a senha padrão é pública
// (está no código) e permitiria forjar um token de admin.
const SECRET_RAW =
  process.env.NEXTAUTH_SECRET ||
  (process.env.NODE_ENV === 'production' ? '' : 'dev-only-secret-not-for-production')
const JWT_SECRET = new TextEncoder().encode(SECRET_RAW)

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
  '/api/clients',
  '/api/coupons/validate',
  '/api/campaigns/',
  '/api/health',
  '/api/speedtest',
  '/api/status',
  '/api/detector',
  '/api/blog/comments',
] as const

// Formulários públicos: únicos POST permitidos sem login
const PUBLIC_POST_ROUTES = [
  '/api/auth/login',
  '/api/leads',
  '/api/referrals',
  '/api/coupons/validate',
  '/api/blog/comments',
  '/api/speedtest',
] as const

// Listagens com dados de clientes: só admin pode ler
const PRIVATE_READ_ROUTES = [
  '/api/leads',
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
  '/promo',
  '/empresas',
  '/teste-velocidade',
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
    // extensão de arquivo só libera fora da API (antes /api/qualquer.json passava sem login)
    (!pathname.startsWith('/api/') && STATIC_EXTENSIONS.some(ext => pathname.endsWith(ext)))
  ) {
    return NextResponse.next()
  }

  // Permitir rotas públicas do site
  if (PUBLIC_PAGES.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next()
  }

  // Rotas públicas de API: visitante só LÊ (GET/HEAD).
  // Gravar (POST/PUT/DELETE) exige login, exceto os formulários do site.
  const method = request.method.toUpperCase()
  const isRead = method === 'GET' || method === 'HEAD' || method === 'OPTIONS'
  if (isRead && pathname.startsWith('/api/uploads/')) {
    return NextResponse.next()
  }
  if (method === 'POST' && PUBLIC_POST_ROUTES.some(route => pathname === route)) {
    return NextResponse.next()
  }
  if (
    isRead &&
    !PRIVATE_READ_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`)) &&
    PUBLIC_ROUTES.some(route => pathname.startsWith(route))
  ) {
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
      if (!SECRET_RAW) throw new Error('NEXTAUTH_SECRET ausente')
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
  matcher: ['/admin/:path*', '/api/:path*'],
}
