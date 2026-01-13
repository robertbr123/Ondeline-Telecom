import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import db from '@/lib/db'

// GET - Listar FAQ
export async function GET() {
  try {
    const faq = db
      .prepare('SELECT * FROM faq ORDER BY "order" ASC')
      .all() as any[]

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

    db.prepare(`
      INSERT INTO faq (id, question, answer, category, "order", active)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, question, answer, category, order, active ? 1 : 0)

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
