"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Edit, Trash2, FileText, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

interface Page {
  id: string
  slug: string
  title: string
  content: string
  description: string
  meta_title: string
  meta_description: string
  keywords: string[]
  hero_title: string
  hero_subtitle: string
  hero_image: string
  active: boolean
  created_at: string
  updated_at: string
}

export default function AdminPages() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPage, setEditingPage] = useState<Page | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages')
      const data = await res.json()
      if (data.success) {
        setPages(data.data || [])
      }
    } catch (error) {
      console.error('Erro ao buscar páginas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = () => {
    setIsCreating(true)
    setEditingPage({
      id: '',
      slug: '',
      title: '',
      content: '',
      description: '',
      meta_title: '',
      meta_description: '',
      keywords: [],
      hero_title: '',
      hero_subtitle: '',
      hero_image: '',
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }

  const savePage = async (page: Page) => {
    try {
      const isNewPage = isCreating || !page.id || page.id === ''
      const method = isNewPage ? 'POST' : 'PUT'
      const url = isNewPage ? '/api/pages' : `/api/pages/${page.slug}`
      
      const pageData = {
        slug: page.slug,
        title: page.title,
        content: page.content,
        description: page.description,
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        keywords: page.keywords,
        hero_title: page.hero_title,
        hero_subtitle: page.hero_subtitle,
        hero_image: page.hero_image,
        active: page.active,
      }
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      })

      const data = await res.json()
      
      if (!res.ok) {
        alert(`Erro: ${data.error || 'Erro ao salvar página'}`)
        return
      }
      
      fetchPages()
      setEditingPage(null)
      setIsCreating(false)
      alert('Página salva com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar página:', error)
      alert('Erro ao salvar página. Verifique o console.')
    }
  }

  const deletePage = async (slug: string) => {
    if (!confirm('Tem certeza que deseja deletar esta página? Esta ação não pode ser desfeita.')) return

    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchPages()
      }
    } catch (error) {
      console.error('Erro ao deletar página:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
            <h1 className="text-2xl font-bold">Gerenciar Páginas</h1>
            <Button
              onClick={handleCreateNew}
              className="flex items-center gap-2"
            >
              <Plus size={16} /> Nova Página
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma página encontrada</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pages.map((page) => (
              <div
                key={page.id}
                className={`p-6 rounded-xl border transition ${
                  !page.active
                    ? 'border-gray-600/30 bg-gray-600/5'
                    : 'border-border bg-card/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText size={20} className="text-primary" />
                    <h3 className="font-bold text-lg">{page.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {!page.active && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full">
                        <EyeOff size={12} /> Inativa
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground font-mono">
                      /{page.slug}
                    </span>
                  </div>
                </div>

                {page.hero_title && (
                  <div className="mb-3">
                    <span className="text-sm font-medium text-primary">{page.hero_title}</span>
                  </div>
                )}

                {page.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {page.description}
                  </p>
                )}

                <div className="text-xs text-muted-foreground mb-4 space-y-1">
                  <div>Atualizado em: {formatDate(page.updated_at)}</div>
                  {page.keywords.length > 0 && (
                    <div>Keywords: {page.keywords.slice(0, 3).join(', ')}{page.keywords.length > 3 ? '...' : ''}</div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setIsCreating(false)
                      setEditingPage(page)
                    }}
                  >
                    <Edit size={14} className="mr-1" /> Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deletePage(page.slug)}
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
      {editingPage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {isCreating ? 'Nova Página' : 'Editar Página'}
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Slug (URL) *</label>
                  <input
                    type="text"
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="ipixuna, empresas, coverage..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">URL amigável: /{editingPage.slug}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Título *</label>
                  <input
                    type="text"
                    value={editingPage.title}
                    onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="Título da página"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Conteúdo (HTML/Markdown) *</label>
                <textarea
                  value={editingPage.content}
                  onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg h-64 font-mono text-sm"
                  placeholder="Conteúdo principal da página..."
                />
                <p className="text-xs text-muted-foreground mt-1">Use HTML para formatação ou Markdown simples</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrição Curta</label>
                <textarea
                  value={editingPage.description}
                  onChange={(e) => setEditingPage({ ...editingPage, description: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg h-20"
                  placeholder="Descrição resumida da página..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Título do Hero</label>
                  <input
                    type="text"
                    value={editingPage.hero_title}
                    onChange={(e) => setEditingPage({ ...editingPage, hero_title: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="Título da seção hero"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtítulo do Hero</label>
                  <input
                    type="text"
                    value={editingPage.hero_subtitle}
                    onChange={(e) => setEditingPage({ ...editingPage, hero_subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="Subtítulo da seção hero"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL da Imagem do Hero</label>
                <input
                  type="text"
                  value={editingPage.hero_image}
                  onChange={(e) => setEditingPage({ ...editingPage, hero_image: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Title (SEO)</label>
                  <input
                    type="text"
                    value={editingPage.meta_title}
                    onChange={(e) => setEditingPage({ ...editingPage, meta_title: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="Título para motores de busca"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description (SEO)</label>
                  <input
                    type="text"
                    value={editingPage.meta_description}
                    onChange={(e) => setEditingPage({ ...editingPage, meta_description: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="Descrição para motores de busca"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Keywords (SEO)</label>
                <input
                  type="text"
                  value={editingPage.keywords.join(', ')}
                  onChange={(e) => setEditingPage({ 
                    ...editingPage, 
                    keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) 
                  })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  placeholder="internet, wifi, amazonas..."
                />
                <p className="text-xs text-muted-foreground mt-1">Separadas por vírgula</p>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPage.active}
                    onChange={(e) => setEditingPage({ ...editingPage, active: e.target.checked })}
                  />
                  <span className="text-sm font-medium">Página ativa (visível)</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingPage(null)
                    setIsCreating(false)
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => savePage(editingPage)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Salvar Página
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}