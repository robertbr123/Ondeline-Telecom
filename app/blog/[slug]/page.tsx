import { Metadata } from 'next'
import { query } from '@/lib/db'
import BlogPostContent from './BlogPostContent'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  try {
    const result = await query(
      'SELECT title, excerpt, cover_image FROM blog_posts WHERE slug = $1 AND published = 1',
      [slug]
    )
    const post = result.rows[0]
    if (!post) return {}
    return {
      title: `${post.title} | Blog Ondeline`,
      description: post.excerpt || '',
      openGraph: {
        title: post.title,
        description: post.excerpt || '',
        images: post.cover_image ? [{ url: post.cover_image, width: 1200, height: 630 }] : [],
        type: 'article',
        siteName: 'Ondeline',
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
  return <BlogPostContent slug={slug} />
}
