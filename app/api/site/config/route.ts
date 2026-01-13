import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

// GET - Obter configurações
export async function GET() {
  try {
    const config = db.prepare('SELECT * FROM site_config').all() as any[]
    
    const configObj: any = {}
    config.forEach(item => {
      configObj[item.key] = item.key === 'keywords' ? JSON.parse(item.value) : item.value
    })

    return NextResponse.json({
      success: true,
      data: configObj,
    })
  } catch (error) {
    console.error('Erro ao buscar configurações:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar configurações' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar configurações
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    const update = db.prepare('INSERT OR REPLACE INTO site_config (key, value) VALUES (?, ?)')
    
    for (const [key, value] of Object.entries(body)) {
      const valueToStore = key === 'keywords' ? JSON.stringify(value) : String(value)
      update.run(key, valueToStore)
    }

    return NextResponse.json({
      success: true,
      data: body,
      message: 'Configurações atualizadas com sucesso',
    })
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar configurações' },
      { status: 500 }
    )
  }
}
