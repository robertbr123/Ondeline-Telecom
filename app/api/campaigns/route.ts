import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { nanoid } from 'nanoid'
import { getCachedData, invalidateCache, DEFAULT_TTL } from '@/lib/cache'

// GET - Listar campanhas
export async function GET() {
  try {
    const campaigns = await getCachedData(
      'campaigns',
      async () => {
        const result = await query('SELECT * FROM campaigns ORDER BY created_at DESC')
        return result.rows.map((c: any) => ({
          ...c,
          features: c.features ? JSON.parse(c.features) : [],
          active: c.active === 1,
        }))
      },
      DEFAULT_TTL.SHORT
    )

    return NextResponse.json({ success: true, data: campaigns })
  } catch (error) {
    console.error('Erro ao buscar campanhas:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar campanhas' },
      { status: 500 }
    )
  }
}

// POST - Criar campanha
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, title, subtitle, description, hero_image, cta_text, cta_whatsapp_message, coupon_code, default_city, features, active, starts_at, ends_at } = body

    if (!slug || !title) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios: slug, title' },
        { status: 400 }
      )
    }

    const id = `campaign-${nanoid(8)}`
    const now = new Date().toISOString()

    await query(`
      INSERT INTO campaigns (id, slug, title, subtitle, description, hero_image, cta_text, cta_whatsapp_message, coupon_code, default_city, features, active, views, leads_count, starts_at, ends_at, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 0, 0, $13, $14, $15, $16)
    `, [
      id,
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
      active !== false ? 1 : 0,
      starts_at || '',
      ends_at || '',
      now,
      now
    ])

    await invalidateCache('campaigns')

    return NextResponse.json({
      success: true,
      data: { id, slug, title },
      message: 'Campanha criada com sucesso',
    })
  } catch (error: any) {
    console.error('Erro ao criar campanha:', error)
    if (error?.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Já existe uma campanha com este slug' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Erro ao criar campanha' },
      { status: 500 }
    )
  }
}
