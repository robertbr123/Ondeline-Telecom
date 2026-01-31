import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { query } from '@/lib/db'
import { featureSchema } from '@/lib/validations'
import { z } from 'zod'

// GET - Listar features
export async function GET() {
  try {
    const result = await query('SELECT * FROM features WHERE active = 1 ORDER BY "order" ASC')
    const features = result.rows

    return NextResponse.json({
      success: true,
      data: features,
    })
  } catch (error) {
    console.error('Erro ao buscar features:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar features' },
      { status: 500 }
    )
  }
}

// POST - Criar feature (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar dados
    const validatedData = featureSchema.parse(body)

    const id = nanoid()
    const now = new Date().toISOString()

    // Inserir no banco
    await query(`
      INSERT INTO features (id, title, description, icon, color, "order", active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [
      id,
      validatedData.title,
      validatedData.description,
      validatedData.icon,
      validatedData.color,
      validatedData.order,
      validatedData.active ? 1 : 0,
      now,
      now
    ])

    return NextResponse.json({
      success: true,
      data: { id, ...validatedData },
      message: 'Feature criada com sucesso!',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Erro ao criar feature:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar feature' },
      { status: 500 }
    )
  }
}
