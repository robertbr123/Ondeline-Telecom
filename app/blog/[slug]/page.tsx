"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Eye, Clock, Share2 } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  video_url: string
  author: string
  category: string
  tags: string[]
  published: boolean
  views: number
  created_at: string
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    fetchPost()
    fetchRelatedPosts()
  }, [params.slug])

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/blog/${params.slug}`)
      const data = await res.json()
      if (data.success) {
        setPost(data.data)
        setLoading(false)
      }
    } catch (error) {
      console.error('Erro ao buscar post:', error)
      setLoading(false)
    }
  }

  const fetchRelatedPosts = async () => {
    try {
      const res = await fetch('/api/blog')
      const data = await res.json()
      if (data.success) {
        const allPosts = data.data || []
        const publishedPosts = allPosts.filter((p: BlogPost) => p.published)
        setRelatedPosts(publishedPosts.slice(1, 4))
      }
    } catch (error) {
      console.error('Erro ao buscar posts relacionados:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-6"
          >
            <ArrowLeft size={16} /> Voltar para Início
          </Link>
          
          <div className="text-center">
            <div className="inline-block h-12 w-12 border-4 border-t-primary/50 border-b-primary/50 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-6"
          >
            <ArrowLeft size={16} /> Voltar para Início
          </Link>
          
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-muted-foreground">Post não encontrado</h1>
            <p className="text-muted-foreground">O post que você está procurando não existe ou foi removido.</p>
            <Link href="/blog">
              <Button className="mt-4">Ver todos os posts</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft size={16} /> Voltar para Início
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Blog</h1>
            <Link href="/blog">
              <Button variant="outline" size="sm">Ver todos os posts</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2">
            {post.video_url ? (
              <video
                src={post.video_url}
                controls
                className="w-full h-64 lg:h-96 object-cover rounded-xl mb-6"
              />
            ) : post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-64 lg:h-96 object-cover rounded-xl mb-6"
              />
            )}
            
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full mb-3">
                {post.category}
              </span>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">{post.title}</h1>
              
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
                <Clock size={16} />
                <span>{formatDate(post.created_at)}</span>
                <span className="flex items-center gap-1 ml-4">
                  <Eye size={14} />
                  {post.views} visualizações
                </span>
                <span className="ml-4">
                  Por <span className="font-medium">{post.author}</span>
                </span>
              </div>
            </div>

            {post.excerpt && (
              <p className="text-lg text-muted-foreground mb-6 italic border-l-4 border-border pl-6">
                {post.excerpt}
              </p>
            )}

            <div className="prose prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-block px-3 py-1 bg-secondary/20 text-secondary-foreground text-sm rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card/50 border border-border rounded-xl p-6 sticky top-8">
              <h3 className="text-lg font-bold mb-4">Autor</h3>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">{post.author.charAt(0).toUpperCase()}</span>
                </div>
                <span className="font-medium">{post.author}</span>
              </div>

              <hr className="border-border" />

              <h3 className="text-lg font-bold mb-4">Categoría</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                  {post.category}
                </span>
              </div>

              <hr className="border-border" />

              <h3 className="text-lg font-bold mb-4">Data de Publicação</h3>
              <div className="text-sm text-muted-foreground">
                {formatDate(post.created_at)}
              </div>

              <hr className="border-border" />

              <h3 className="text-lg font-bold mb-4">Visualizações</h3>
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span className="text-2xl font-bold">{post.views}</span>
              </div>

              <hr className="border-border" />

              <h3 className="text-lg font-bold mb-4">Compartilhar</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 size={14} className="mr-1" />
                  Link
                </Button>
                <Button size="sm" className="flex-1">
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">Posts Relacionados</h3>
              
              {relatedPosts.length > 0 ? (
                <div className="space-y-3">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      href={`/blog/${related.slug}`}
                      className="block group"
                    >
                      <h4 className="font-medium text-foreground group-hover:text-primary transition mb-1">
                        {related.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock size={12} />
                        {formatDate(related.created_at)}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum post relacionado encontrado.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </article>
  )
}
