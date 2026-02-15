import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const includeInactive = searchParams.get('includeInactive') === 'true'
    
    let queryStr = 'SELECT * FROM clients'
    if (!includeInactive) {
      queryStr += ' WHERE active = 1'
    }
    queryStr += ' ORDER BY "order" ASC'
    
    const result = await query(queryStr)
    
    return NextResponse.json({
      success: true,
      data: result.rows,
    })
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar clientes' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, logo, bgColor = 'bg-white', order = 0, active = 1 } = body

    if (!name || !logo) {
      return NextResponse.json(
        { success: false, error: 'Nome e logo são obrigatórios' },
        { status: 400 }
      )
    }

    const id = `client-${nanoid()}`
    const now = new Date().toISOString()

    await query(
      'INSERT INTO clients (id, name, logo, bg_color, "order", active, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [id, name, logo, bgColor, order, active, now, now]
    )

    return NextResponse.json({
      success: true,
      data: { id, name, logo, bg_color: bgColor, order, active, created_at: now, updated_at: now },
    })
  } catch (error) {
    console.error('Erro ao criar cliente:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar cliente' },
      { status: 500 }
    )
  }
}
