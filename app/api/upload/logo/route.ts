import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Nenhum arquivo enviado' },
        { status: 400 }
      )
    }

    // Verificar tipo de arquivo
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Tipo de arquivo inválido. Use PNG, JPG, SVG ou WebP.' },
        { status: 400 }
      )
    }

    // Criar diretório uploads se não existir
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Gerar nome do arquivo
    const ext = file.name.split('.').pop()
    const fileName = `logo.${ext}`
    const filePath = path.join(uploadsDir, fileName)

    // Converter para buffer e salvar
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    const logoUrl = `/uploads/${fileName}?t=${Date.now()}`

    return NextResponse.json({
      success: true,
      data: { url: logoUrl },
      message: 'Logo atualizado com sucesso',
    })
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao fazer upload do arquivo' },
      { status: 500 }
    )
  }
}
