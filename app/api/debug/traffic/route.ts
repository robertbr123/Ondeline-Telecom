import { NextRequest, NextResponse } from 'next/server'

// Esta variável será importada do middleware (precisamos expor os logs)
declare global {
  var requestLogs: any[]
}

// Se não existir, inicializa
if (!global.requestLogs) {
  global.requestLogs = []
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'summary'
    const minutes = parseInt(searchParams.get('minutes') || '5')

    // Filtrar logs por período
    const now = Date.now()
    const cutoffTime = now - (minutes * 60 * 1000)
    
    const filteredLogs = (global.requestLogs || []).filter(
      (log: any) => new Date(log.timestamp).getTime() > cutoffTime
    )

    // Estatísticas básicas
    const stats = {
      totalRequests: filteredLogs.length,
      timeframe: `últimos ${minutes} minutos`,
      byMethod: {} as Record<string, number>,
      byPath: {} as Record<string, number>,
      byIP: {} as Record<string, number>,
      uniqueIPs: new Set(filteredLogs.map((l: any) => l.ip)).size,
      topPaths: [] as Array<{ path: string; count: number }>,
      topIPs: [] as Array<{ ip: string; count: number }>,
      suspicious: {
        rateLimiting: [] as Array<{ ip: string; count: number }>,
        scraping: [] as Array<{ ua: string; count: number }>,
        apiAbuse: [] as Array<{ path: string; count: number }>
      }
    }

    // Agrupar por método
    filteredLogs.forEach((log: any) => {
      stats.byMethod[log.method] = (stats.byMethod[log.method] || 0) + 1
      stats.byPath[log.pathname] = (stats.byPath[log.pathname] || 0) + 1
      stats.byIP[log.ip] = (stats.byIP[log.ip] || 0) + 1
    })

    // Top paths
    stats.topPaths = Object.entries(stats.byPath)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }))

    // Top IPs
    stats.topIPs = Object.entries(stats.byIP)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([ip, count]) => ({ ip, count }))

    // Detectar atividades suspeitas
    const ipCounts = stats.byIP
    Object.entries(ipCounts).forEach(([ip, count]) => {
      if (count > 100) {
        stats.suspicious.rateLimiting.push({ ip, count })
      }
    })

    // Detectar scraping (mesmo user agent muitas vezes)
    const uaCounts: Record<string, number> = {}
    filteredLogs.forEach((log: any) => {
      if (!log.userAgent.includes('bot') && !log.userAgent.includes('Bot')) {
        uaCounts[log.userAgent] = (uaCounts[log.userAgent] || 0) + 1
      }
    })
    
    Object.entries(uaCounts).forEach(([ua, count]) => {
      if (count > 200) {
        stats.suspicious.scraping.push({ ua: ua.substring(0, 80), count })
      }
    })

    // Detectar abuso de API
    const apiCounts: Record<string, number> = {}
    filteredLogs.forEach((log: any) => {
      if (log.pathname.startsWith('/api/')) {
        apiCounts[log.pathname] = (apiCounts[log.pathname] || 0) + 1
      }
    })
    
    Object.entries(apiCounts).forEach(([path, count]) => {
      if (count > 500) {
        stats.suspicious.apiAbuse.push({ path, count })
      }
    })

    // Retornar baseado no formato solicitado
    if (format === 'summary') {
      return NextResponse.json({
        success: true,
        stats,
        logsCount: filteredLogs.length,
        timestamp: new Date().toISOString()
      })
    }

    if (format === 'detailed') {
      return NextResponse.json({
        success: true,
        stats,
        logs: filteredLogs.map((log: any) => ({
          ...log,
          userAgent: log.userAgent.substring(0, 150) // Truncar UA
        }))
      })
    }

    if (format === 'csv') {
      const headers = ['timestamp', 'method', 'pathname', 'ip', 'userAgent', 'referer']
      const csvRows = filteredLogs.map((log: any) => 
        headers.map(h => JSON.stringify(log[h] || '')).join(',')
      )
      const csv = [headers.join(','), ...csvRows].join('\n')
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="traffic-${Date.now()}.csv"`
        }
      })
    }

    return NextResponse.json({
      success: true,
      stats
    })

  } catch (error: any) {
    console.error('❌ Error in traffic debug endpoint:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        hint: 'Make sure middleware.ts is exporting requestLogs'
      },
      { status: 500 }
    )
  }
}