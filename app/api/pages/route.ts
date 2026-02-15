import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { nanoid } from 'nanoid'
import { getCachedData, invalidateCache, DEFAULT_TTL } from '@/lib/cache'

// GET - Buscar todas as páginas
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (slug) {
      // Buscar página específica por slug
      const result = await query('SELECT * FROM pages WHERE slug = $1', [slug])
      
      if (!result.rows[0]) {
        return NextResponse.json(
          { success: false, error: 'Página não encontrada' },
          { status: 404 }
        )
      }

      const page = result.rows[0]
      return NextResponse.json({
        success: true,
        data: {
          id: page.id,
          slug: page.slug,
          title: page.title,
          content: page.content,
          description: page.description,
          meta_title: page.meta_title,
          meta_description: page.meta_description,
          keywords: page.keywords || [],
          hero_title: page.hero_title,
          hero_subtitle: page.hero_subtitle,
          hero_image: page.hero_image,
          active: page.active,
          created_at: page.created_at,
          updated_at: page.updated_at,
        },
      })
    }

    // Buscar todas as páginas
    const pages = await getCachedData(
      'pages:all',
      async () => {
        const result = await query(`
          SELECT * FROM pages 
          ORDER BY title ASC
        `)

        return result.rows.map((p: any) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          content: p.content,
          description: p.description,
          meta_title: p.meta_title,
          meta_description: p.meta_description,
          keywords: p.keywords || [],
          hero_title: p.hero_title,
          hero_subtitle: p.hero_subtitle,
          hero_image: p.hero_image,
          active: p.active,
          created_at: p.created_at,
          updated_at: p.updated_at,
        }))
      },
      DEFAULT_TTL.MEDIUM
    )

    return NextResponse.json({
      success: true,
      data: pages,
    })
  } catch (error) {
    console.error('Erro ao buscar páginas:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar páginas' },
      { status: 500 }
    )
  }
}

// POST - Criar nova página
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, title, content, description, meta_title, meta_description, keywords, hero_title, hero_subtitle, hero_image, active } = body

    if (!slug || !title || !content) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios: slug, title, content' },
        { status: 400 }
      )
    }

    // Verificar se slug já existe
    const existing = await query('SELECT id FROM pages WHERE slug = $1', [slug])
    if (existing.rows[0]) {
      return NextResponse.json(
        { success: false, error: 'Já existe uma página com este slug' },
        { status: 400 }
      )
    }

    const id = `page-${nanoid(8)}`
    const now = new Date().toISOString()

    await query(`
      INSERT INTO pages (id, slug, title, content, description, meta_title, meta_description, keywords, hero_title, hero_subtitle, hero_image, active, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `, [
      id,
      slug,
      title,
      content,
      description || '',
      meta_title || '',
      meta_description || '',
      keywords || [],
      hero_title || '',
      hero_subtitle || '',
      hero_image || '',
      active !== false,
      now,
      now
    ])

    // Invalidar cache
    await invalidateCache('pages:')

    return NextResponse.json({
      success: true,
      data: { id, slug, title },
      message: 'Página criada com sucesso',
    })
  } catch (error) {
    console.error('Erro ao criar página:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar página' },
      { status: 500 }
    )
  }
}