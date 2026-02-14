import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'
)

// Sistema de monitoramento de tráfego
interface RequestLog {
  timestamp: string
  method: string
  pathname: string
  ip: string
  userAgent: string
  referer?: string
  headers: Record<string, string>
}

const requestLogs: RequestLog[] = []
const MAX_LOG_SIZE = 1000 // Manter apenas últimos 1000 logs em memória
let lastCleanup = Date.now()

function logRequest(request: NextRequest): void {
  try {
    const now = Date.now()
    
    // Limpar logs antigos a cada 5 minutos
    if (now - lastCleanup > 5 * 60 * 1000) {
      if (requestLogs.length > MAX_LOG_SIZE) {
        requestLogs.splice(0, requestLogs.length - MAX_LOG_SIZE)
      }
      lastCleanup = now
    }

    const log: RequestLog = {
      timestamp: new Date().toISOString(),
      method: request.method,
      pathname: request.nextUrl.pathname,
      ip: getClientIP(request),
      userAgent: request.headers.get('user-agent') || 'unknown',
      referer: request.headers.get('referer') || undefined,
      headers: {
        'content-type': request.headers.get('content-type') || '',
        'authorization': request.headers.get('authorization') ? '***' : '',
        'accept': request.headers.get('accept') || '',
        'accept-language': request.headers.get('accept-language') || '',
      }
    }

    requestLogs.push(log)

    // Log detalhado para debug
    console.log('📊 [TRAFFIC]', {
      timestamp: log.timestamp,
      method: log.method,
      path: log.pathname,
      ip: log.ip,
      ua: log.userAgent.substring(0, 100),
      totalRequests: requestLogs.length
    })

    // Alertar para padrões suspeitos
    detectSuspiciousPatterns(log)

  } catch (error) {
    console.error('❌ Error logging request:', error)
  }
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'unknown'
}

function detectSuspiciousPatterns(log: RequestLog): void {
  const now = Date.now()
  const last5Minutes = requestLogs.filter(
    l => Date.now() - new Date(l.timestamp).getTime() < 5 * 60 * 1000
  )

  // Detectar rate limiting por IP
  const ipCount = last5Minutes.filter(l => l.ip === log.ip).length
  if (ipCount > 100) {
    console.warn('⚠️ [RATE LIMIT DETECTED]', {
      ip: log.ip,
      requestsIn5Min: ipCount,
      timestamp: log.timestamp
    })
  }

  // Detectar scraping (mesmo user-agent, múltiplas rotas)
  const uaCount = last5Minutes.filter(l => l.userAgent === log.userAgent).length
  if (uaCount > 200 && log.userAgent.includes('bot') === false) {
    console.warn('⚠️ [SCRAPE DETECTED]', {
      userAgent: log.userAgent.substring(0, 80),
      requestsIn5Min: uaCount,
      timestamp: log.timestamp
    })
  }

  // Detectar ataques a rotas específicas
  const apiRoutes = last5Minutes.filter(l => l.pathname.startsWith('/api/'))
  if (apiRoutes.length > 500) {
    console.warn('⚠️ [API ABUSE DETECTED]', {
      totalAPIRequests: apiRoutes.length,
      timestamp: log.timestamp
    })
  }
}

// Endpoint para ver estatísticas (apenas em desenvolvimento)
if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
  console.log('📊 Traffic monitoring enabled. Access /api/debug/traffic for stats')
}

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

  // Log todas as requisições para monitoramento
  logRequest(request)

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
