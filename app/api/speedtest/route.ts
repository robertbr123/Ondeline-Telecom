import { NextRequest, NextResponse } from 'next/server'
import { apiLogger } from '@/lib/logger'

// GET - Download speed test: returns random bytes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const size = Math.min(
      parseInt(searchParams.get('size') || '1048576'),
      10 * 1024 * 1024 // max 10MB
    )

    // Generate random bytes for download test
    const buffer = Buffer.alloc(size)
    for (let i = 0; i < size; i += 4) {
      const rand = (Math.random() * 0xFFFFFFFF) >>> 0
      buffer[i] = rand & 0xFF
      if (i + 1 < size) buffer[i + 1] = (rand >> 8) & 0xFF
      if (i + 2 < size) buffer[i + 2] = (rand >> 16) & 0xFF
      if (i + 3 < size) buffer[i + 3] = (rand >> 24) & 0xFF
    }

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': size.toString(),
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Server-Timestamp': Date.now().toString(),
      },
    })
  } catch (error) {
    apiLogger.error({ err: error }, 'Speed test download failed')
    return NextResponse.json({ error: 'Speed test failed' }, { status: 500 })
  }
}

// POST - Upload speed test: receives bytes and returns timing
export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now()
    const body = await request.arrayBuffer()
    const endTime = Date.now()

    return NextResponse.json({
      received: body.byteLength,
      serverTime: endTime - startTime,
      timestamp: endTime,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (error) {
    apiLogger.error({ err: error }, 'Speed test upload failed')
    return NextResponse.json({ error: 'Speed test failed' }, { status: 500 })
  }
}
