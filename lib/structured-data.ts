import { query } from './db'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ondeline Telecom',
    url: 'https://ondeline.com.br',
    logo: 'https://ondeline.com.br/logo-ondeline.png',
    description: 'Internet de alta velocidade no Amazonas',
    email: 'contato@ondeline.com.br',
    telephone: '+55-92-98460-7721',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Amazonas',
      addressCountry: 'BR',
    },
    areaServed: [
      { '@type': 'City', name: 'Ipixuna', addressRegion: 'Amazonas' },
      { '@type': 'City', name: 'Eirunepé', addressRegion: 'Amazonas' },
      { '@type': 'City', name: 'Itamarati', addressRegion: 'Amazonas' },
      { '@type': 'City', name: 'Carauari', addressRegion: 'Amazonas' },
    ],
    priceRange: 'R$ 100 - R$ 150',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+55-92-98460-7721',
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
    sameAs: [
      'https://facebook.com/ondeline',
      'https://instagram.com/ondeline',
      'https://linkedin.com/company/ondeline',
    ],
  }
}

export function generateBlogSchema(post: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.coverImage || 'https://ondeline.com.br/og-default.jpg',
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Organization',
      name: 'Ondeline Telecom',
      url: 'https://ondeline.com.br',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ondeline Telecom',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ondeline.com.br/logo-ondeline.png',
      },
    },
  }
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'InternetServiceProvider',
    name: 'Ondeline Telecom',
    image: 'https://ondeline.com.br/logo-ondeline.png',
    url: 'https://ondeline.com.br',
    telephone: '+55-92-98460-7721',
    email: 'contato@ondeline.com.br',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Amazonas',
      addressCountry: 'BR',
    },
    areaServed: [
      { '@type': 'City', name: 'Ipixuna', addressRegion: 'Amazonas' },
      { '@type': 'City', name: 'Eirunepé', addressRegion: 'Amazonas' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  }
}

export async function generateBlogSchemas() {
  try {
    const result = await query(`
      SELECT title, description, cover_image, created_at, updated_at 
      FROM blog_posts 
      WHERE active = 1
    `)
    
    return result.rows.map(generateBlogSchema)
  } catch (error) {
    console.error('Erro ao gerar schemas de blog:', error)
    return []
  }
}