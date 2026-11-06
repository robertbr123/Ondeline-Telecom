import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { getSiteFile } from '@/lib/site-files'

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: segments } = await params
    const fileName = segments.join('/')

    // Sanitize: prevent directory traversal
    if (fileName.includes('..') || fileName.includes('\\')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName)

    if (!existsSync(filePath)) {
      // Depois de um deploy a pasta some: busca a cópia do banco
      const stored = await getSiteFile(fileName)
      if (!stored) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 })
      }
      return new NextResponse(new Uint8Array(stored.data), {
        status: 200,
        headers: {
          'Content-Type': stored.mime,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }

    const ext = path.extname(filePath).toLowerCase()
    const contentType = MIME_TYPES[ext] || 'application/octet-stream'

    const fileBuffer = await readFile(filePath)

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving upload:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
