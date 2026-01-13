import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { query } from '@/lib/db'

// GET - Listar FAQ
export async function GET() {
  try {
    const result = await query('SELECT * FROM faq ORDER BY "order" ASC')
    const faq = result.rows as any[]

    return NextResponse.json({
      success: true,
      data: faq,
    })
  } catch (error) {
    console.error('Erro ao buscar FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar FAQ' },
      { status: 500 }
    )
  }
}

// POST - Criar FAQ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question, answer, category, order = 0, active = true } = body

    if (!question || !answer || !category) {
      return NextResponse.json(
        { success: false, error: 'Pergunta, resposta e categoria são obrigatórios' },
        { status: 400 }
      )
    }

    const id = nanoid()

    await query(`
      INSERT INTO faq (id, question, answer, category, "order", active)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [id, question, answer, category, order, active ? 1 : 0])

    return NextResponse.json({
      success: true,
      data: { id, question, answer, category, order, active },
      message: 'FAQ criada com sucesso',
    })
  } catch (error) {
    console.error('Erro ao criar FAQ:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar FAQ' },
      { status: 500 }
    )
  }
}
