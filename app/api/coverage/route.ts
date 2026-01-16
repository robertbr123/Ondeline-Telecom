import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { nanoid } from 'nanoid'

// GET - Listar áreas de cobertura
export async function GET() {
  try {
    // Criar tabela se não existir
    await query(`
      CREATE TABLE IF NOT EXISTS coverage_areas (
        id TEXT PRIMARY KEY,
        city TEXT NOT NULL,
        state TEXT NOT NULL DEFAULT 'AM',
        status TEXT DEFAULT 'coming_soon',
        latitude REAL,
        longitude REAL,
        description TEXT,
        launch_date TEXT,
        created_at TEXT,
        updated_at TEXT
      )
    `)

    const result = await query('SELECT * FROM coverage_areas ORDER BY status ASC, city ASC')
    
    const areas = result.rows.map((area: any) => ({
      id: area.id,
      city: area.city,
      state: area.state,
      status: area.status,
      latitude: area.latitude,
      longitude: area.longitude,
      description: area.description,
      launchDate: area.launch_date,
      created_at: area.created_at,
      updated_at: area.updated_at,
    }))

    return NextResponse.json({
      success: true,
      data: areas,
    })
  } catch (error) {
    console.error('Erro ao buscar áreas de cobertura:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar áreas de cobertura' },
      { status: 500 }
    )
  }
}

// POST - Criar nova área de cobertura
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { city, state, status, latitude, longitude, description, launchDate } = body

    if (!city || !state) {
      return NextResponse.json(
        { success: false, error: 'Cidade e estado são obrigatórios' },
        { status: 400 }
      )
    }

    const id = `area-${nanoid(8)}`
    const now = new Date().toISOString()

    await query(`
      INSERT INTO coverage_areas (id, city, state, status, latitude, longitude, description, launch_date, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
      id,
      city,
      state,
      status || 'coming_soon',
      latitude || 0,
      longitude || 0,
      description || '',
      launchDate || null,
      now,
      now
    ])

    return NextResponse.json({
      success: true,
      data: { id, city, state, status, latitude, longitude, description, launchDate },
      message: 'Área de cobertura criada com sucesso',
    })
  } catch (error) {
    console.error('Erro ao criar área de cobertura:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar área de cobertura' },
      { status: 500 }
    )
  }
}
