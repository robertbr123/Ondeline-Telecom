import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir rotas públicas
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/auth/login') ||
    pathname.startsWith('/api/auth/debug') ||
    pathname.startsWith('/api/leads') ||
    pathname.startsWith('/api/faq') ||
    pathname.startsWith('/api/plans') ||
    pathname.startsWith('/api/site/config') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/public') ||
    pathname === '/' ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/coverage') ||
    pathname.includes('.png') ||
    pathname.includes('.jpg') ||
    pathname.includes('.svg') ||
    pathname.includes('.ico')
  ) {
    return NextResponse.next()
  }

  // Proteger rotas de admin
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/')) {
    const token = request.cookies.get('auth-token')?.value
    const allCookies = request.cookies.getAll()
    
    console.log('🔒 Middleware check for:', pathname)
    console.log('🍪 All cookies:', allCookies.map(c => c.name))
    console.log('🎫 Auth token present:', !!token)

    if (!token) {
      console.log('❌ No token, redirecting to login')
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
      console.log('✅ Token valid, allowing access')
      return NextResponse.next()
    } catch (error) {
      console.log('❌ Token invalid:', error)
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
