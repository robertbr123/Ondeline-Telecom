"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import { toast } from 'sonner'
import { submitAPI } from '@/hooks/useAPI'
import { LoadingSpinner, LoadingTable } from '@/components/loading'
import { FEATURE_ICONS } from '@/lib/constants'

interface Feature {
  id: string
  title: string
  description: string
  icon: string
  color: string
  order: number
  active: boolean
}

export default function AdminFeaturesPage() {
  const router = useRouter()
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null)

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    try {
      const res = await fetch('/api/features')
      const data = await res.json()
      if (data.success) {
        setFeatures(data.data || [])
      }
    } catch (error) {
      toast.error('Erro ao carregar features')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta feature?')) return

    const result = await submitAPI(`/api/features/${id}`, 'DELETE')
    if (result.success) {
      fetchFeatures()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
      color: formData.get('color') as string,
      order: parseInt(formData.get('order') as string) || 0,
      active: formData.get('active') === 'on',
    }

    const result = editingFeature
      ? await submitAPI(`/api/features/${editingFeature.id}`, 'PUT', data)
      : await submitAPI('/api/features', 'POST', data)

    if (result.success) {
      setIsModalOpen(false)
      setEditingFeature(null)
      fetchFeatures()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/admin')}>
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-2xl font-bold">Gerenciar Features</h1>
          </div>
          <Button
            onClick={() => {
              setEditingFeature(null)
              setIsModalOpen(true)
            }}
            className="flex items-center gap-2"
          >
            <Plus size={18} /> Nova Feature
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingTable />
        ) : features.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhuma feature cadastrada</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`inline-p-3 rounded-lg bg-gradient-to-br ${feature.color} p-3`}>
                    <div className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingFeature(feature)
                        setIsModalOpen(true)
                      }}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(feature.id)}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </div>
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Ordem: {feature.order}</span>
                  <span>{feature.active ? <Check className="text-green-500" size={16} /> : <X className="text-red-500" size={16} />}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingFeature ? 'Editar Feature' : 'Nova Feature'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título</label>
                <input
                  name="title"
                  type="text"
                  defaultValue={editingFeature?.title}
                  required
                  className="w-full p-2 rounded border border-border bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <textarea
                  name="description"
                  defaultValue={editingFeature?.description}
                  required
                  rows={3}
                  className="w-full p-2 rounded border border-border bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ícone</label>
                <select
                  name="icon"
                  defaultValue={editingFeature?.icon}
                  required
                  className="w-full p-2 rounded border border-border bg-background"
                >
                  {FEATURE_ICONS.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cor (Tailwind gradient)</label>
                <input
                  name="color"
                  type="text"
                  defaultValue={editingFeature?.color}
                  placeholder="from-blue-500 to-blue-600"
                  required
                  className="w-full p-2 rounded border border-border bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ordem</label>
                <input
                  name="order"
                  type="number"
                  defaultValue={editingFeature?.order || 0}
                  required
                  className="w-full p-2 rounded border border-border bg-background"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  name="active"
                  type="checkbox"
                  defaultChecked={editingFeature?.active ?? true}
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">Ativa</label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingFeature ? 'Salvar' : 'Criar'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingFeature(null)
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
