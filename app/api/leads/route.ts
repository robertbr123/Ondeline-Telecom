import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { query } from '@/lib/db'
import { leadSchema } from '@/lib/validations'

// GET - Listar leads (admin)
export async function GET(request: NextRequest) {
  try {
    const result = await query('SELECT * FROM leads ORDER BY created_at DESC')
    const leads = result.rows as any[]

    return NextResponse.json({
      success: true,
      data: leads,
    })
  } catch (error) {
    console.error('Erro ao buscar leads:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar leads' },
      { status: 500 }
    )
  }
}

// POST - Criar lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar dados
    const validatedData = leadSchema.parse(body)

    const id = nanoid()
    const now = new Date().toISOString()

    // Inserir no banco
    await query(`
      INSERT INTO leads (id, name, email, phone, city, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, 'new', $6, $7)
    `, [id, validatedData.name, validatedData.email, validatedData.phone, validatedData.city, now, now])

    // Enviar email de notificação
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      })

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_USER,
        subject: `Novo Lead - ${validatedData.name}`,
        html: `
          <h2>Novo Pré-cadastro Recebido</h2>
          <p><strong>Nome:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Telefone:</strong> ${validatedData.phone}</p>
          <p><strong>Cidade:</strong> ${validatedData.city}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        `,
      })
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError)
      // Não falhar se o email não for enviado
    }

    return NextResponse.json({
      success: true,
      data: { id, ...validatedData },
      message: 'Pré-cadastro realizado com sucesso!',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Erro ao criar lead:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao criar lead' },
      { status: 500 }
    )
  }
}
