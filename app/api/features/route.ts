import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { query } from '@/lib/db'
import { featureSchema } from '@/lib/validations'
import { z } from 'zod'
import { getCachedData, DEFAULT_TTL } from '@/lib/cache'

// GET - Listar features
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const includeInactive = searchParams.get('includeInactive') === 'true'
    
    const features = await getCachedData(
      'features',
      async () => {
        const result = await query(
          includeInactive 
            ? 'SELECT * FROM features ORDER BY "order" ASC'
            : 'SELECT * FROM features WHERE active = 1 ORDER BY "order" ASC'
        )
        return result.rows
      },
      includeInactive ? DEFAULT_TTL.SHORT : DEFAULT_TTL.LONG,
      { includeInactive }
    )

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