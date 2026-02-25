import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { invalidateCache } from '@/lib/cache'

// GET - Buscar campanha por ID ou slug (público se slug)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Buscar por slug (público) ou por ID (admin)
    const result = await query(
      'SELECT * FROM campaigns WHERE slug = $1 OR id = $1',
      [id]
    )

    const campaign = result.rows[0]

    if (!campaign) {
      return NextResponse.json(
        { success: false, error: 'Campanha não encontrada' },
        { status: 404 }
      )
    }

    // Incrementar views
    await query('UPDATE campaigns SET views = views + 1 WHERE id = $1', [campaign.id])

    return NextResponse.json({
      success: true,
      data: {
        ...campaign,
        features: campaign.features ? JSON.parse(campaign.features) : [],
        active: campaign.active === 1,
      },
    })
  } catch (error) {
    console.error('Erro ao buscar campanha:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar campanha' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar campanha
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { slug, title, subtitle, description, hero_image, cta_text, cta_whatsapp_message, coupon_code, default_city, features, active, starts_at, ends_at } = body

    const existing = await query('SELECT id FROM campaigns WHERE id = $1', [id])
    if (!existing.rows[0]) {
      return NextResponse.json(
        { success: false, error: 'Campanha não encontrada' },
        { status: 404 }
      )
    }

    const now = new Date().toISOString()

    await query(`
      UPDATE campaigns
      SET slug = $1, title = $2, subtitle = $3, description = $4, hero_image = $5,
          cta_text = $6, cta_whatsapp_message = $7, coupon_code = $8, default_city = $9,
          features = $10, active = $11, starts_at = $12, ends_at = $13, updated_at = $14
      WHERE id = $15
    `, [
      slug,
      title,
      subtitle || '',
      description || '',
      hero_image || '',
      cta_text || 'Contratar Agora',
      cta_whatsapp_message || '',
      coupon_code || '',
      default_city || '',
      JSON.stringify(features || []),
      active ? 1 : 0,
      starts_at || '',
      ends_at || '',
      now,
      id
    ])

    await invalidateCache('campaigns')

    return NextResponse.json({
      success: true,
      message: 'Campanha atualizada com sucesso',
    })
  } catch (error) {
    console.error('Erro ao atualizar campanha:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar campanha' },
      { status: 500 }
    )
  }
}

// DELETE - Deletar campanha
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await query('DELETE FROM campaigns WHERE id = $1', [id])

    if (result.rowCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Campanha não encontrada' },
        { status: 404 }
      )
    }

    await invalidateCache('campaigns')

    return NextResponse.json({
      success: true,
      message: 'Campanha deletada com sucesso',
    })
  } catch (error) {
    console.error('Erro ao deletar campanha:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar campanha' },
      { status: 500 }
    )
  }
}
