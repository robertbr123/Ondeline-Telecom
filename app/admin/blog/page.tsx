"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Eye, Trash2, Edit, FileText } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  author: string
  category: string
  tags: string[]
  published: boolean
  views: number
  created_at: string
  updated_at: string
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog?unpublished=true')
      const data = await res.json()
      if (data.success) {
        setPosts(data.data || [])
      }
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const savePost = async (post: BlogPost) => {
    try {
      const method = post.id ? 'PUT' : 'POST'
      const url = post.id ? `/api/blog/${post.slug}` : '/api/blog'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      })

      if (res.ok) {
        fetchPosts()
        setEditingPost(null)
      }
    } catch (error) {
      console.error('Erro ao salvar post:', error)
    }
  }

  const deletePost = async (id: string, slug: string) => {
    if (!confirm('Tem certeza que deseja deletar este post?')) return

    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchPosts()
      }
    } catch (error) {
      console.error('Erro ao deletar post:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft size={16} /> Voltar
          </Link>
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-2xl font-bold">Gerenciar Blog</h1>
            <Button
              onClick={() => setEditingPost({
                id: '',
                title: '',
                slug: '',
                excerpt: '',
                content: '',
                cover_image: '',
                author: '',
                category: 'geral',
                tags: [],
                published: false,
                views: 0,
                created_at: '',
                updated_at: '',
              })}
              className="flex items-center gap-2"
            >
              <Plus size={16} /> Novo Post
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum post encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`p-6 rounded-xl border transition ${
                  post.published
                    ? 'border-border bg-card/50'
                    : 'border-yellow-500/30 bg-yellow-500/5'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {!post.published && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded-full">
                      Rascunho
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">
                    <Eye size={12} /> {post.views} views
                  </span>
                  <span className="ml-auto text-sm text-muted-foreground">{post.category}</span>
                </div>

                {post.cover_image && (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <FileText size={12} />
                  <span>Por: {post.author}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setEditingPost(post)}
                  >
                    <Edit size={14} className="mr-1" /> Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deletePost(post.id, post.slug)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal de Edição/Criação */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingPost.id ? 'Editar Post' : 'Novo Post'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título *</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  placeholder="Título do post"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Slug</label>
                  <input
                    type="text"
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="url-amigavel-do-post"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Deixe vazio para gerar automaticamente</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Categoria</label>
                  <select
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  >
                    <option value="geral">Geral</option>
                    <option value="noticias">Notícias</option>
                    <option value="tutoriais">Tutoriais</option>
                    <option value="atualizacoes">Atualizações</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Resumo (Excerpt)</label>
                <textarea
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg h-20"
                  placeholder="Breve descrição do post..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL da Imagem de Capa</label>
                <input
                  type="text"
                  value={editingPost.cover_image}
                  onChange={(e) => setEditingPost({ ...editingPost, cover_image: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Autor *</label>
                <input
                  type="text"
                  value={editingPost.author}
                  onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  placeholder="Nome do autor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={editingPost.tags.join(', ')}
                  onChange={(e) => setEditingPost({ 
                    ...editingPost, 
                    tags: e.target.value.split(',').map(t => t.trim()).filter(t => t) 
                  })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  placeholder="internet, tecnologia, amazonas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Conteúdo (Markdown/HTML) *</label>
                <textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg h-64 font-mono text-sm"
                  placeholder="Escreva seu post aqui..."
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPost.published}
                    onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                  />
                  <span className="text-sm font-medium">Publicar agora</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setEditingPost(null)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => savePost(editingPost)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
