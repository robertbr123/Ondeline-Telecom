import { Metadata } from 'next'
import { query } from '@/lib/db'
import BlogPostContent from './BlogPostContent'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ondeline.com.br'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  try {
    const result = await query(
      'SELECT title, excerpt, cover_image, author, created_at, updated_at FROM blog_posts WHERE slug = $1 AND published = 1',
      [slug]
    )
    const post = result.rows[0]
    if (!post) return {}
    return {
      title: `${post.title} | Blog Ondeline`,
      description: post.excerpt || '',
      alternates: {
        canonical: `${BASE_URL}/blog/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt || '',
        images: post.cover_image ? [{ url: post.cover_image, width: 1200, height: 630 }] : [],
        type: 'article',
        siteName: 'Ondeline',
        locale: 'pt_BR',
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
        authors: [post.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || '',
        images: post.cover_image ? [post.cover_image] : [],
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Buscar dados para o Schema.org (server-side)
  let schemaData: Record<string, unknown> | null = null
  try {
    const result = await query(
      'SELECT title, excerpt, cover_image, author, created_at, updated_at FROM blog_posts WHERE slug = $1 AND published = 1',
      [slug]
    )
    const post = result.rows[0]
    if (post) {
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt || '',
        image: post.cover_image ? [post.cover_image] : [],
        datePublished: post.created_at,
        dateModified: post.updated_at,
        author: {
          '@type': 'Person',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Ondeline Telecom',
          url: BASE_URL,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${BASE_URL}/blog/${slug}`,
        },
      }
    }
  } catch {
    // silencioso — não bloqueia a página
  }

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      <BlogPostContent slug={slug} />
    </>
  )
}
