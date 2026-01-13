import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { query } from '@/lib/db'

// GET - Listar planos
export async function GET() {
  try {
    const result = await query('SELECT * FROM plans ORDER BY active DESC, highlighted DESC, name ASC')
    const plans = result.rows as any[]

    const plansWithFeatures = plans.map((plan) => ({
      ...plan,
      features: JSON.parse(plan.features),
      highlighted: Boolean(plan.highlighted),
      active: Boolean(plan.active),
    }))

    return NextResponse.json({
      success: true,
      data: plansWithFeatures,
    })
  } catch (error) {
    console.error('Erro ao buscar planos:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar planos' },
      { status: 500 }
    )
  }
}

// POST - Criar plano
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, speed, price, description, features, highlighted = false, active = true } = body

    // Validação básica
    if (!name || !speed || !price || !description || !features) {
      return NextResponse.json(
        { success: false, error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    const id = nanoid()
    const now = new Date().toISOString()

    await query(`
      INSERT INTO plans (id, name, speed, price, description, features, highlighted, active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [id, name, speed, price, description, JSON.stringify(features), highlighted ? 1 : 0, active ? 1 : 0, now, now])

    return NextResponse.json({
      success: true,
      data: { id, name, speed, price, description, features, highlighted, active },
      message: 'Plano criado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao criar plano:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar plano' },
      { status: 500 }
    )
  }
}
