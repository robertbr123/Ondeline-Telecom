import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { nanoid } from 'nanoid'

// POST - Criar novo plano
export async function POST(request: NextRequest) {
  try {
    console.log('=== API PLANS - POST ===')
    
    const body = await request.json()
    console.log('Body recebido:', body)
    
    const { name, speed, price, description, features, highlighted, active } = body

    console.log('Campos:', { name, speed, price, description, features: highlighted, active })

    // Validação básica
    if (!name || !speed || !price || !description || !features) {
      console.error('Campos obrigatórios faltando')
      return NextResponse.json(
        { success: false, error: 'Todos os campos são obrigatórios: name, speed, price, description, features' },
        { status: 400 }
      )
    }

    const id = `plan-${nanoid(8)}`
    const now = new Date().toISOString()
    console.log('ID gerado:', id)
    console.log('Timestamp:', now)

    console.log('Inserindo no banco...')

    await query(`
      INSERT INTO plans (id, name, speed, price, description, features, highlighted, active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [
      id,
      name,
      speed,
      price,
      description,
      JSON.stringify(features),
      highlighted ? 1 : 0,
      active ? 1 : 0,
      now,
      now
    ])

    console.log('Plano inserido com sucesso!')

    return NextResponse.json({
      success: true,
      data: { id, name, speed, price, description, features, highlighted, active },
      message: 'Plano criado com sucesso',
    })
  } catch (error) {
    console.error('=== ERRO AO CRIAR PLANO ===')
    console.error('Erro:', error)
    console.error('Stack trace:', error.stack)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar plano: ' + error.message },
      { status: 500 }
    )
  }
}

// GET - Listar planos
export async function GET() {
  try {
    console.log('=== API PLANS - GET ===')
    const result = await query('SELECT * FROM plans ORDER BY active DESC, highlighted DESC, name ASC')
    
    const plans = result.rows.map((plan: any) => ({
      id: plan.id,
      name: plan.name,
      speed: plan.speed,
      price: plan.price,
      description: plan.description,
      features: JSON.parse(plan.features),
      highlighted: plan.highlighted === 1,
      active: plan.active === 1,
      created_at: plan.created_at,
      updated_at: plan.updated_at,
    }))

    console.log(`Encontrados ${plans.length} planos`)
    return NextResponse.json({
      success: true,
      data: plans,
    })
  } catch (error) {
    console.error('=== ERRO AO BUSCAR PLANOS ===')
    console.error('Erro:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar planos' },
      { status: 500 }
    )
  }
}
