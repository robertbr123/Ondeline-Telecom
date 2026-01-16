import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { nanoid } from 'nanoid'

// GET - Listar clientes/parceiros
export async function GET() {
  try {
    // Primeiro, verificar se a tabela existe e criar se necessário
    await query(`
      CREATE TABLE IF NOT EXISTS clients (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        logo TEXT NOT NULL,
        website TEXT,
        active INTEGER DEFAULT 1,
        display_order INTEGER DEFAULT 1,
        created_at TEXT,
        updated_at TEXT
      )
    `)

    const result = await query('SELECT * FROM clients ORDER BY display_order ASC, name ASC')
    
    const clients = result.rows.map((client: any) => ({
      id: client.id,
      name: client.name,
      logo: client.logo,
      website: client.website,
      active: client.active === 1,
      order: client.display_order,
      created_at: client.created_at,
      updated_at: client.updated_at,
    }))

    return NextResponse.json({
      success: true,
      data: clients,
    })
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar clientes' },
      { status: 500 }
    )
  }
}

// POST - Criar novo cliente
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, logo, website, active, order } = body

    if (!name || !logo) {
      return NextResponse.json(
        { success: false, error: 'Nome e logo são obrigatórios' },
        { status: 400 }
      )
    }

    const id = `client-${nanoid(8)}`
    const now = new Date().toISOString()

    await query(`
      INSERT INTO clients (id, name, logo, website, active, display_order, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      id,
      name,
      logo,
      website || '',
      active ? 1 : 0,
      order || 1,
      now,
      now
    ])

    return NextResponse.json({
      success: true,
      data: { id, name, logo, website, active, order },
      message: 'Cliente criado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao criar cliente:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar cliente' },
      { status: 500 }
    )
  }
}
