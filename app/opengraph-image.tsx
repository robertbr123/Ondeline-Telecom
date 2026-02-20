import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const alt = 'Ondeline - Internet Rápida no Amazonas'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoPath = join(process.cwd(), 'public', 'logo-ondeline.png')
  const logoData = readFileSync(logoPath)
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0f2044 60%, #0d3580 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Círculo decorativo de fundo */}
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            top: '-100px',
            right: '-100px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            bottom: '-80px',
            left: '-60px',
          }}
        />

        {/* Logo */}
        <img
          src={logoBase64}
          width={160}
          height={160}
          style={{
            objectFit: 'contain',
            filter: 'invert(1) brightness(1.1)',
            marginBottom: '32px',
          }}
        />

        {/* Nome */}
        <div
          style={{
            color: '#ffffff',
            fontSize: '64px',
            fontWeight: 700,
            letterSpacing: '-1px',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          Ondeline Telecom
        </div>

        {/* Tagline */}
        <div
          style={{
            color: '#93c5fd',
            fontSize: '30px',
            fontWeight: 400,
            marginBottom: '28px',
            textAlign: 'center',
          }}
        >
          Internet Rápida no Amazonas
        </div>

        {/* Linha separadora */}
        <div
          style={{
            width: '80px',
            height: '3px',
            background: 'rgba(147, 197, 253, 0.5)',
            borderRadius: '2px',
            marginBottom: '28px',
          }}
        />

        {/* Cidades */}
        <div
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '22px',
            textAlign: 'center',
            letterSpacing: '1px',
          }}
        >
          Ipixuna • Eirunepé • Itamarati • Carauari
        </div>
      </div>
    ),
    { ...size }
  )
}
