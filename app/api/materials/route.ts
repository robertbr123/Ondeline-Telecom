import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { nanoid } from 'nanoid'

// GET - Buscar todos os materiais
export async function GET(request: NextRequest) {
  try {
    const result = await query(`
      SELECT * FROM materials 
      WHERE active = 1 
      ORDER BY created_at DESC
    `)

    const materials = result.rows.map(m => ({
      id: m.id,
      title: m.title,
      description: m.description,
      file_url: m.file_url,
      file_type: m.file_type,
      category: m.category,
      downloads: m.downloads,
      created_at: m.created_at,
      updated_at: m.updated_at,
    }))

    return NextResponse.json({
      success: true,
      data: materials,
    })
  } catch (error) {
    console.error('Erro ao buscar materiais:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar materiais' },
      { status: 500 }
    )
  }
}

// POST - Criar novo material
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, file_url, file_type, category } = body

    if (!title || !file_url || !file_type) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios: title, file_url, file_type' },
        { status: 400 }
      )
    }

    const id = `mat-${nanoid(8)}`
    const now = new Date().toISOString()

    await query(`
      INSERT INTO materials (id, title, description, file_url, file_type, category, active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [id, title, description || '', file_url, file_type, category || 'documentos', 1, now, now])

    return NextResponse.json({
      success: true,
      data: { id, title, description, file_url, file_type, category },
      message: 'Material criado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao criar material:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar material' },
      { status: 500 }
    )
  }
}
