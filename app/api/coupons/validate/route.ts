import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

// POST - Validar cupom (rota pública)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code } = body

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Código do cupom é obrigatório' },
        { status: 400 }
      )
    }

    const result = await query(
      'SELECT * FROM coupons WHERE code = $1 AND active = 1',
      [code.toUpperCase()]
    )

    const coupon = result.rows[0]

    if (!coupon) {
      return NextResponse.json(
        { success: false, error: 'Cupom não encontrado ou inativo' },
        { status: 404 }
      )
    }

    const now = new Date().toISOString()

    if (coupon.valid_from > now) {
      return NextResponse.json(
        { success: false, error: 'Cupom ainda não está válido' },
        { status: 400 }
      )
    }

    if (coupon.valid_until < now) {
      return NextResponse.json(
        { success: false, error: 'Cupom expirado' },
        { status: 400 }
      )
    }

    if (coupon.max_uses > 0 && coupon.current_uses >= coupon.max_uses) {
      return NextResponse.json(
        { success: false, error: 'Cupom atingiu o limite de uso' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        code: coupon.code,
        description: coupon.description,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value,
      },
      message: 'Cupom válido!',
    })
  } catch (error) {
    console.error('Erro ao validar cupom:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao validar cupom' },
      { status: 500 }
    )
  }
}
