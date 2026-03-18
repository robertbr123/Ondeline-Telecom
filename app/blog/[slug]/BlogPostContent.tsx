"use client"

import { useEffect, useState, useMemo } from 'react'
import { ArrowLeft, Eye, Clock, MessageSquare, Send } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

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

interface Comment {
  id: string
  post_id: string
  author_name: string
  content: string
  created_at: string
}

interface TOCItem {
  id: string
  text: string
  level: number
}

function extractTOC(html: string): TOCItem[] {
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi
  const items: TOCItem[] = []
  let match
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const text = match[2].replace(/<[^>]+>/g, '').trim()
    const id = text.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    items.push({ id, text, level })
  }
  return items
}

function addIdsToHeadings(html: string): string {
  return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (_, level, attrs, text) => {
    const plainText = text.replace(/<[^>]+>/g, '').trim()
    const id = plainText.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    return `<h${level}${attrs} id="${id}">${text}</h${level}>`
  })
}

export default function BlogPostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' })
  const [submitting, setSubmitting] = useState(false)
  const [commentMsg, setCommentMsg] = useState('')

  useEffect(() => {
    fetchPost()
    fetchRelatedPosts()
  }, [slug])

  useEffect(() => {
    if (post) {
      fetchComments(post.id)
    }
  }, [post?.id])

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/blog/${slug}`)
      const data = await res.json()
      if (data.success) setPost(data.data)
    } catch (error) {
      console.error('Erro ao buscar post:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedPosts = async () => {
    try {
      const res = await fetch('/api/blog')
      const data = await res.json()
      if (data.success && post) {
        const others = (data.data || []).filter((p: BlogPost) => p.published && p.slug !== slug)
        // Score by shared category and tags
        const scored = others.map((p: BlogPost) => {
          let score = 0
          if (p.category === post.category) score += 3
          if (post.tags && p.tags) {
            for (const tag of p.tags) {
              if (post.tags.includes(tag)) score += 2
            }
          }
          return { ...p, _score: score }
        })
        scored.sort((a: any, b: any) => b._score - a._score)
        setRelatedPosts(scored.slice(0, 3))
      } else if (data.success) {
        // Post not loaded yet, just grab first 3 others
        const others = (data.data || []).filter((p: BlogPost) => p.published && p.slug !== slug)
        setRelatedPosts(others.slice(0, 3))
      }
    } catch (error) {
      console.error('Erro ao buscar posts relacionados:', error)
    }
  }

  // Re-fetch related posts when post loads (for proper scoring)
  useEffect(() => {
    if (post) fetchRelatedPosts()
  }, [post?.id])

  const fetchComments = async (postId: string) => {
    try {
      const res = await fetch(`/api/blog/comments?postId=${postId}`)
      const data = await res.json()
      if (data.success) setComments(data.data || [])
    } catch (error) {
      console.error('Erro ao buscar comentários:', error)
    }
  }

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!post || !commentForm.name || !commentForm.content) return

    setSubmitting(true)
    setCommentMsg('')
    try {
      const res = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: post.id,
          authorName: commentForm.name,
          authorEmail: commentForm.email,
          content: commentForm.content,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setCommentMsg('Comentário enviado! Será publicado após aprovação.')
        setCommentForm({ name: '', email: '', content: '' })
      } else {
        setCommentMsg(data.error || 'Erro ao enviar comentário')
      }
    } catch {
      setCommentMsg('Erro ao enviar comentário')
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const handleWhatsApp = () => {
    const url = window.location.href
    const text = post ? `Confira: *${post.title}*\n${url}` : url
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const toc = useMemo(() => post ? extractTOC(post.content) : [], [post?.content])
  const processedContent = useMemo(() => post ? addIdsToHeadings(post.content) : '', [post?.content])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="inline-block h-10 w-10 border-4 border-t-primary/50 border-b-primary/50 rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-muted-foreground mb-2">Post não encontrado</h1>
          <p className="text-muted-foreground mb-6">O post que você está procurando não existe ou foi removido.</p>
          <Link href="/blog" className="text-primary hover:underline">
            Ver todos os posts
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-8"
          >
            <ArrowLeft size={16} /> Voltar ao Blog
          </Link>

          {/* Categoria + botão WhatsApp */}
          <div className="flex items-center justify-between mb-3">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
              {post.category}
            </span>
            <button
              onClick={handleWhatsApp}
              title="Compartilhar no WhatsApp"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Compartilhar
            </button>
          </div>

          {/* Título */}
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">{post.title}</h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {formatDate(post.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={14} />
              {post.views} visualizações
            </span>
            <span>
              Por <span className="font-medium text-foreground">{post.author}</span>
            </span>
          </div>

          {/* Mídia */}
          {post.video_url ? (
            <video src={post.video_url} controls className="w-full rounded-xl mb-8" />
          ) : post.cover_image ? (
            <img src={post.cover_image} alt={post.title} className="w-full rounded-xl mb-8 object-cover max-h-96" />
          ) : null}

          {/* Table of Contents */}
          {toc.length >= 3 && (
            <nav className="mb-8 p-5 rounded-xl border border-border bg-card/50">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Índice</h2>
              <ul className="space-y-1.5">
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
                    <a
                      href={`#${item.id}`}
                      className="text-sm text-muted-foreground hover:text-primary transition"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-8 italic border-l-4 border-primary pl-6">
              {post.excerpt}
            </p>
          )}

          {/* Conteúdo */}
          <div className="prose prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: processedContent }} />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Comments Section */}
          <div className="border-t border-border pt-10 mb-12">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare size={20} />
              Comentários ({comments.length})
            </h3>

            {/* Comment form */}
            <form onSubmit={submitComment} className="mb-8 p-5 rounded-xl border border-border bg-card/50">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Seu nome *"
                  value={commentForm.name}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
                <input
                  type="email"
                  placeholder="Seu email (opcional)"
                  value={commentForm.email}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
              </div>
              <textarea
                placeholder="Escreva seu comentário... *"
                value={commentForm.content}
                onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                required
                rows={3}
                maxLength={2000}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none mb-3"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {commentForm.content.length}/2000
                </span>
                <button
                  type="submit"
                  disabled={submitting || !commentForm.name || !commentForm.content}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
                >
                  <Send size={14} />
                  {submitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
              {commentMsg && (
                <p className="mt-3 text-sm text-muted-foreground">{commentMsg}</p>
              )}
            </form>

            {/* Comments list */}
            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-lg border border-border bg-card/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-foreground">{comment.author_name}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum comentário ainda. Seja o primeiro!</p>
            )}
          </div>

          {/* Posts Relacionados */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-border pt-10">
              <h3 className="text-xl font-bold mb-6">Posts Relacionados</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                    {related.cover_image && (
                      <img
                        src={related.cover_image}
                        alt={related.title}
                        className="w-full h-36 object-cover rounded-lg mb-3 group-hover:opacity-80 transition"
                      />
                    )}
                    <h4 className="font-medium text-foreground group-hover:text-primary transition line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{related.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
