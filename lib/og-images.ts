import { ImageResponse } from 'next/og'

export async function generateOGImage(title: string, description: string, subtitle?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '900px' }}>
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              margin: '0 0 20px 0',
              lineHeight: 1.1,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: '36px',
                margin: '0 0 30px 0',
                opacity: 0.95,
                fontWeight: 600,
              }}
            >
              {subtitle}
            </p>
          )}
          <p
            style={{
              fontSize: '24px',
              margin: 0,
              opacity: 0.85,
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

export async function generateBlogOGImage(post: {
  title: string
  description: string
  category?: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '900px' }}>
          {post.category && (
            <div
              style={{
                display: 'inline-block',
                padding: '8px 20px',
                background: 'rgba(14, 165, 233, 0.2)',
                border: '2px solid #0ea5e9',
                borderRadius: '8px',
                fontSize: '16px',
                marginBottom: '24px',
                color: '#0ea5e9',
                fontWeight: 600,
              }}
            >
              {post.category}
            </div>
          )}
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              margin: '0 0 24px 0',
              lineHeight: 1.1,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontSize: '24px',
              margin: 0,
              opacity: 0.8,
              lineHeight: 1.5,
            }}
          >
            {post.description}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

export async function generatePlanOGImage(plan: {
  name: string
  speed: string
  price: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '900px' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '12px 30px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              fontSize: '20px',
              marginBottom: '24px',
              fontWeight: 600',
            }}
          >
            {plan.speed}
          </div>
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              margin: '0 0 20px 0',
              lineHeight: 1,
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {plan.name}
          </h1>
          <p
            style={{
              fontSize: '48px',
              margin: 0,
              fontWeight: 'bold',
            }}
          >
            {plan.price}
            <span style={{ fontSize: '24px', fontWeight: 400, opacity: 0.9 }}>
              /mês
            </span>
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}