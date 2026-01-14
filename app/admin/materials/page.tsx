"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, FileText, Download, Trash2, Edit } from 'lucide-react'
import Link from 'next/link'

interface Material {
  id: string
  title: string
  description: string
  file_url: string
  file_type: string
  category: string
  downloads: number
  created_at: string
  updated_at: string
}

export default function AdminMaterials() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      const res = await fetch('/api/materials')
      const data = await res.json()
      if (data.success) {
        setMaterials(data.data || [])
      }
    } catch (error) {
      console.error('Erro ao buscar materiais:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = () => {
    setIsCreating(true)
    setEditingMaterial({
      id: '',
      title: '',
      description: '',
      file_url: '',
      file_type: 'pdf',
      category: 'documentos',
      downloads: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      active: true,
    })
  }

  const saveMaterial = async (material: Material) => {
    try {
      const isNewMaterial = isCreating || !material.id || material.id === ''
      const method = isNewMaterial ? 'POST' : 'PUT'
      const url = isNewMaterial ? '/api/materials' : `/api/materials/${material.id}`
      
      const materialData = {
        title: material.title,
        description: material.description,
        file_url: material.file_url,
        file_type: material.file_type,
        category: material.category,
        active: true,
      }
      
      console.log('=== SALVANDO MATERIAL ===')
      console.log('isNewMaterial:', isNewMaterial)
      console.log('method:', method)
      console.log('url:', url)
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(materialData),
      })

      const data = await res.json()
      console.log('=== RESPOSTA DA API ===', data)
      
      if (!res.ok) {
        console.error('Erro na resposta:', data)
        alert(`Erro: ${data.error || 'Erro ao salvar material'}`)
        return
      }
      
      fetchMaterials()
      setEditingMaterial(null)
      setIsCreating(false)
      alert('Material salvo com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar material:', error)
      alert('Erro ao salvar material. Verifique o console.')
    }
  }

  const deleteMaterial = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este material?')) return

    try {
      const res = await fetch(`/api/materials/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchMaterials()
      }
    } catch (error) {
      console.error('Erro ao deletar material:', error)
    }
  }

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />
      case 'video': return <FileText className="w-5 h-5 text-blue-500" />
      case 'image': return <FileText className="w-5 h-5 text-green-500" />
      default: return <FileText className="w-5 h-5 text-gray-500" />
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
            <h1 className="text-2xl font-bold">Gerenciar Materiais</h1>
            <Button
              onClick={handleCreateNew}
              className="flex items-center gap-2"
            >
              <Plus size={16} /> Novo Material
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : materials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum material encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <div
                key={material.id}
                className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {getFileTypeIcon(material.file_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1 truncate">{material.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {material.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Download size={14} />
                  <span>{material.downloads} downloads</span>
                  <span className="ml-auto">{material.category}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setIsCreating(false)
                      setEditingMaterial(material)
                    }}
                  >
                    <Edit size={14} className="mr-1" /> Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteMaterial(material.id)}
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
      {editingMaterial && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {isCreating ? 'Novo Material' : 'Editar Material'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título *</label>
                <input
                  type="text"
                  value={editingMaterial.title}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, title: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  placeholder="Nome do material"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <textarea
                  value={editingMaterial.description}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, description: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg h-24"
                  placeholder="Descrição do material"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">URL do Arquivo *</label>
                  <input
                    type="text"
                    value={editingMaterial.file_url}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, file_url: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="https://exemplo.com/arquivo.pdf"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Arquivo *</label>
                  <select
                    value={editingMaterial.file_type}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, file_type: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  >
                    <option value="pdf">PDF</option>
                    <option value="video">Vídeo</option>
                    <option value="image">Imagem</option>
                    <option value="document">Documento</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Categoria</label>
                <select
                  value={editingMaterial.category}
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, category: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                >
                  <option value="documentos">Documentos</option>
                  <option value="manuais">Manuais</option>
                  <option value="tutoriais">Tutoriais</option>
                  <option value="outros">Outros</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingMaterial(null)
                    setIsCreating(false)
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => saveMaterial(editingMaterial)}
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
