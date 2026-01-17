"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Trash2, Edit, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  active: boolean
}

const CATEGORIES = [
  { value: 'geral', label: 'Geral' },
  { value: 'instalacao', label: 'Instalação' },
  { value: 'pagamento', label: 'Pagamento' },
  { value: 'suporte', label: 'Suporte Técnico' },
  { value: 'planos', label: 'Planos' },
]

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faq')
      const data = await res.json()
      if (data.success) {
        setFaqs(data.data || [])
      }
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = () => {
    setIsCreating(true)
    setEditingFaq({
      id: '',
      question: '',
      answer: '',
      category: 'geral',
      order: faqs.length + 1,
      active: true,
    })
  }

  const saveFaq = async (faq: FAQ) => {
    try {
      const method = isCreating ? 'POST' : 'PUT'
      const url = isCreating ? '/api/faq' : `/api/faq/${faq.id}`
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faq),
      })

      if (res.ok) {
        fetchFaqs()
        setEditingFaq(null)
        setIsCreating(false)
        toast.success('FAQ salva com sucesso!')
      } else {
        toast.error('Erro ao salvar FAQ')
      }
    } catch (error) {
      console.error('Erro ao salvar FAQ:', error)
      toast.error('Erro ao salvar FAQ')
    }
  }

  const deleteFaq = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta pergunta?')) return
    
    try {
      const res = await fetch(`/api/faq/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchFaqs()
        toast.success('FAQ excluída com sucesso!')
      } else {
        toast.error('Erro ao excluir FAQ')
      }
    } catch (error) {
      console.error('Erro ao excluir FAQ:', error)
      toast.error('Erro ao excluir FAQ')
    }
  }

  const toggleActive = async (faq: FAQ) => {
    try {
      const res = await fetch(`/api/faq/${faq.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...faq, active: !faq.active }),
      })

      if (res.ok) {
        fetchFaqs()
        toast.success(`FAQ ${!faq.active ? 'ativada' : 'desativada'} com sucesso!`)
      } else {
        toast.error('Erro ao atualizar status da FAQ')
      }
    } catch (error) {
      console.error('Erro ao atualizar FAQ:', error)
      toast.error('Erro ao atualizar status da FAQ')
    }
  }

  const getCategoryLabel = (value: string) => {
    return CATEGORIES.find(c => c.value === value)?.label || value
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
            <h1 className="text-2xl font-bold">Perguntas Frequentes (FAQ)</h1>
            <Button onClick={handleCreateNew} className="flex items-center gap-2">
              <Plus size={16} /> Nova Pergunta
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : (
          <>
            {/* Modal de Edição */}
            {editingFaq && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-card border border-border rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-6">
                    {isCreating ? 'Nova Pergunta' : 'Editar Pergunta'}
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Pergunta</label>
                      <input
                        type="text"
                        value={editingFaq.question}
                        onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                        className="w-full p-3 rounded-lg border border-border bg-background"
                        placeholder="Ex: Como funciona a instalação?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Resposta</label>
                      <textarea
                        value={editingFaq.answer}
                        onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                        className="w-full p-3 rounded-lg border border-border bg-background min-h-[150px]"
                        placeholder="Digite a resposta completa..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Categoria</label>
                        <select
                          value={editingFaq.category}
                          onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                          className="w-full p-3 rounded-lg border border-border bg-background"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Ordem</label>
                        <input
                          type="number"
                          value={editingFaq.order}
                          onChange={(e) => setEditingFaq({ ...editingFaq, order: parseInt(e.target.value) || 1 })}
                          className="w-full p-3 rounded-lg border border-border bg-background"
                          min="1"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="active"
                        checked={editingFaq.active}
                        onChange={(e) => setEditingFaq({ ...editingFaq, active: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <label htmlFor="active" className="text-sm">Ativo (visível no site)</label>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingFaq(null)
                        setIsCreating(false)
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => saveFaq(editingFaq)}
                      className="flex-1"
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Lista de FAQs */}
            <div className="space-y-4">
              {faqs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma pergunta cadastrada ainda.</p>
                  <p className="text-sm">Clique em "Nova Pergunta" para adicionar.</p>
                </div>
              ) : (
                faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className={`rounded-xl border ${
                      faq.active ? 'border-border bg-card/50' : 'border-border/50 bg-card/20 opacity-60'
                    }`}
                  >
                    <div
                      className="p-4 cursor-pointer flex items-start justify-between gap-4"
                      onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            faq.active
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-gray-500/10 text-gray-500'
                          }`}>
                            {faq.active ? 'Ativo' : 'Inativo'}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {getCategoryLabel(faq.category)}
                          </span>
                        </div>
                        <h3 className="font-semibold">{faq.question}</h3>
                      </div>
                      {expandedId === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>

                    {expandedId === faq.id && (
                      <div className="px-4 pb-4 border-t border-border">
                        <p className="text-muted-foreground mt-4 whitespace-pre-wrap">{faq.answer}</p>
                        
                        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingFaq(faq)
                              setIsCreating(false)
                            }}
                          >
                            <Edit size={14} className="mr-1" /> Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleActive(faq)
                            }}
                          >
                            {faq.active ? 'Desativar' : 'Ativar'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteFaq(faq.id)
                            }}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={14} className="mr-1" /> Excluir
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
