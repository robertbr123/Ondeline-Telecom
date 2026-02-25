import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { nanoid } from 'nanoid'
import { getCachedData, invalidateCache, DEFAULT_TTL } from '@/lib/cache'

// GET - Listar cupons
export async function GET() {
  try {
    const coupons = await getCachedData(
      'coupons',
      async () => {
        const result = await query('SELECT * FROM coupons ORDER BY created_at DESC')
        return result.rows
      },
      DEFAULT_TTL.SHORT
    )

    return NextResponse.json({ success: true, data: coupons })
  } catch (error) {
    console.error('Erro ao buscar cupons:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar cupons' },
      { status: 500 }
    )
  }
}

// POST - Criar cupom
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, description, discount_type, discount_value, max_uses, valid_from, valid_until, active } = body

    if (!code || !description || !discount_type || !discount_value || !valid_from || !valid_until) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios: code, description, discount_type, discount_value, valid_from, valid_until' },
        { status: 400 }
      )
    }

    const id = `coupon-${nanoid(8)}`
    const now = new Date().toISOString()

    await query(`
      INSERT INTO coupons (id, code, description, discount_type, discount_value, max_uses, current_uses, valid_from, valid_until, active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, 0, $7, $8, $9, $10, $11)
    `, [
      id,
      code.toUpperCase(),
      description,
      discount_type,
      discount_value,
      max_uses || 0,
      valid_from,
      valid_until,
      active !== false ? 1 : 0,
      now,
      now
    ])

    await invalidateCache('coupons')

    return NextResponse.json({
      success: true,
      data: { id, code: code.toUpperCase(), description, discount_type, discount_value, max_uses, valid_from, valid_until, active },
      message: 'Cupom criado com sucesso',
    })
  } catch (error: any) {
    console.error('Erro ao criar cupom:', error)
    if (error?.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Já existe um cupom com este código' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Erro ao criar cupom' },
      { status: 500 }
    )
  }
}
