import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const interval = parseInt(searchParams.get('interval') || '5000') // ms entre medições
    const samples = parseInt(searchParams.get('samples') || '12') // número de amostras

    // Função para medir uso de memória
    function getMemoryUsage() {
      if (typeof process !== 'undefined' && process.memoryUsage) {
        const usage = process.memoryUsage()
        return {
          rss: Math.round(usage.rss / 1024 / 1024), // MB
          heapTotal: Math.round(usage.heapTotal / 1024 / 1024), // MB
          heapUsed: Math.round(usage.heapUsed / 1024 / 1024), // MB
          external: Math.round(usage.external / 1024 / 1024), // MB
          arrayBuffers: Math.round(usage.arrayBuffers / 1024 / 1024) // MB
        }
      }
      return null
    }

    // Função para medir uso de CPU (estimado)
    function getCPUUsage(): number {
      if (typeof process !== 'undefined' && process.cpuUsage) {
        const usage = process.cpuUsage()
        return Math.round((usage.user + usage.system) / 1000000) // segundos
      }
      return 0
    }

    // Medição inicial
    const startCPU = getCPUUsage()
    const startMemory = getMemoryUsage()
    const startTime = Date.now()

    // Simular carga para medir CPU
    let counter = 0
    const iterations = 1000000
    for (let i = 0; i < iterations; i++) {
      counter += i
    }

    const endCPU = getCPUUsage()
    const endMemory = getMemoryUsage()
    const endTime = Date.now()

    // Calcular taxa de uso de CPU
    const cpuDelta = endCPU - startCPU
    const timeDelta = (endTime - startTime) / 1000 // segundos
    const cpuUsagePercent = Math.round((cpuDelta / timeDelta) * 100)

    // Coletar estatísticas adicionais
    const stats = {
      timestamp: new Date().toISOString(),
      uptime: typeof process !== 'undefined' && process.uptime ? Math.round(process.uptime()) : 0,
      memory: {
        start: startMemory,
        end: endMemory,
        delta: endMemory ? {
          heapUsed: endMemory.heapUsed - (startMemory?.heapUsed || 0),
          rss: endMemory.rss - (startMemory?.rss || 0)
        } : null
      },
      cpu: {
        usagePercent: Math.min(cpuUsagePercent, 100),
        rawTime: cpuDelta,
        measurementDuration: timeDelta
      },
      performance: {
        iterations,
        opsPerSecond: Math.round(iterations / timeDelta)
      },
      environment: {
        nodeVersion: typeof process !== 'undefined' && process.version ? process.version : 'unknown',
        platform: typeof process !== 'undefined' && process.platform ? process.platform : 'unknown',
        arch: typeof process !== 'undefined' && process.arch ? process.arch : 'unknown'
      }
    }

    // Alertas de recursos
    const alerts: string[] = []
    
    if (stats.cpu.usagePercent > 80) {
      alerts.push('⚠️ CPU Usage CRITICAL: ' + stats.cpu.usagePercent + '%')
    } else if (stats.cpu.usagePercent > 50) {
      alerts.push('⚠️ CPU Usage HIGH: ' + stats.cpu.usagePercent + '%')
    }

    if (stats.memory.end && stats.memory.end.heapUsed > 500) {
      alerts.push('⚠️ Memory Usage HIGH: ' + stats.memory.end.heapUsed + ' MB')
    }

    if (stats.memory.end && stats.memory.end.heapUsed > 1000) {
      alerts.push('🚨 Memory Usage CRITICAL: ' + stats.memory.end.heapUsed + ' MB')
    }

    stats.alerts = alerts

    // Verificar por loops infinitos suspeitos
    const suspiciousPatterns = {
      highCPU: stats.cpu.usagePercent > 80,
      highMemory: stats.memory.end && stats.memory.end.heapUsed > 500,
      memoryLeak: stats.memory.delta && stats.memory.delta.heapUsed > 100
    }

    return NextResponse.json({
      success: true,
      stats,
      suspicious: suspiciousPatterns,
      recommendations: generateRecommendations(stats, suspiciousPatterns)
    })

  } catch (error: any) {
    console.error('❌ Error in resources debug endpoint:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    )
  }
}

function generateRecommendations(stats: any, suspicious: any): string[] {
  const recommendations: string[] = []

  if (suspicious.highCPU) {
    recommendations.push('CPU Usage alto detectado. Verifique loops infinitos ou processamentos pesados.')
    recommendations.push('Considere adicionar rate limiting para limitar requisições.')
    recommendations.push('Verifique logs do Dokploy para identificar processos consumindo CPU.')
  }

  if (suspicious.highMemory) {
    recommendations.push('Memory Usage alto detectado. Possível vazamento de memória.')
    recommendations.push('Verifique por variáveis globais não limpas.')
    recommendations.push('Considere reiniciar o contêiner para liberar memória.')
  }

  if (suspicious.memoryLeak) {
    recommendations.push('DETECTADO POSSÍVEL VAZAMENTO DE MEMÓRIA!')
    recommendations.push('Reinicie o contêiner imediatamente.')
    recommendations.push('Investigue código que mantém referências indefinidamente.')
  }

  if (recommendations.length === 0) {
    recommendations.push('✅ Nenhum problema detectado nos recursos.')
  }

  return recommendations
}