"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Trash2, Edit, MapPin, Check, Clock } from 'lucide-react'
import Link from 'next/link'

interface CoverageArea {
  id: string
  city: string
  state: string
  status: 'active' | 'coming_soon' | 'inactive'
  latitude: number
  longitude: number
  description?: string
  launchDate?: string
}

const STATUS_OPTIONS = [
  { value: 'active', label: 'Ativo', color: 'bg-emerald-500', icon: Check },
  { value: 'coming_soon', label: 'Em breve', color: 'bg-amber-500', icon: Clock },
  { value: 'inactive', label: 'Inativo', color: 'bg-gray-500', icon: MapPin },
]

export default function AdminCoverage() {
  const [areas, setAreas] = useState<CoverageArea[]>([])
  const [loading, setLoading] = useState(true)
  const [editingArea, setEditingArea] = useState<CoverageArea | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchAreas()
  }, [])

  const fetchAreas = async () => {
    try {
      const res = await fetch('/api/coverage')
      const data = await res.json()
      if (data.success) {
        setAreas(data.data || [])
      }
    } catch (error) {
      console.error('Erro ao buscar áreas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = () => {
    setIsCreating(true)
    setEditingArea({
      id: '',
      city: '',
      state: 'AM',
      status: 'coming_soon',
      latitude: -5.0,
      longitude: -70.0,
      description: '',
      launchDate: '',
    })
  }

  const saveArea = async (area: CoverageArea) => {
    try {
      const method = isCreating ? 'POST' : 'PUT'
      const url = isCreating ? '/api/coverage' : `/api/coverage/${area.id}`
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(area),
      })

      if (res.ok) {
        fetchAreas()
        setEditingArea(null)
        setIsCreating(false)
      }
    } catch (error) {
      console.error('Erro ao salvar área:', error)
    }
  }

  const deleteArea = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta área de cobertura?')) return
    
    try {
      const res = await fetch(`/api/coverage/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchAreas()
      }
    } catch (error) {
      console.error('Erro ao excluir área:', error)
    }
  }

  const getStatusInfo = (status: string) => {
    return STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[2]
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
            <h1 className="text-2xl font-bold">Áreas de Cobertura</h1>
            <Button onClick={handleCreateNew} className="flex items-center gap-2">
              <Plus size={16} /> Nova Área
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : (
          <>
            {/* Modal de Edição */}
            {editingArea && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-card border border-border rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-6">
                    {isCreating ? 'Nova Área de Cobertura' : 'Editar Área de Cobertura'}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Cidade</label>
                        <input
                          type="text"
                          value={editingArea.city}
                          onChange={(e) => setEditingArea({ ...editingArea, city: e.target.value })}
                          className="w-full p-3 rounded-lg border border-border bg-background"
                          placeholder="Ex: Ipixuna"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Estado</label>
                        <select
                          value={editingArea.state}
                          onChange={(e) => setEditingArea({ ...editingArea, state: e.target.value })}
                          className="w-full p-3 rounded-lg border border-border bg-background"
                        >
                          <option value="AM">Amazonas</option>
                          <option value="AC">Acre</option>
                          <option value="PA">Pará</option>
                          <option value="RO">Rondônia</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select
                        value={editingArea.status}
                        onChange={(e) => setEditingArea({ ...editingArea, status: e.target.value as any })}
                        className="w-full p-3 rounded-lg border border-border bg-background"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Latitude</label>
                        <input
                          type="number"
                          step="0.000001"
                          value={editingArea.latitude}
                          onChange={(e) => setEditingArea({ ...editingArea, latitude: parseFloat(e.target.value) })}
                          className="w-full p-3 rounded-lg border border-border bg-background"
                          placeholder="-7.047002"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Longitude</label>
                        <input
                          type="number"
                          step="0.000001"
                          value={editingArea.longitude}
                          onChange={(e) => setEditingArea({ ...editingArea, longitude: parseFloat(e.target.value) })}
                          className="w-full p-3 rounded-lg border border-border bg-background"
                          placeholder="-71.680786"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Descrição (opcional)</label>
                      <textarea
                        value={editingArea.description || ''}
                        onChange={(e) => setEditingArea({ ...editingArea, description: e.target.value })}
                        className="w-full p-3 rounded-lg border border-border bg-background"
                        placeholder="Detalhes sobre a cobertura nesta área..."
                        rows={3}
                      />
                    </div>

                    {editingArea.status === 'coming_soon' && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Data de Lançamento (opcional)</label>
                        <input
                          type="date"
                          value={editingArea.launchDate || ''}
                          onChange={(e) => setEditingArea({ ...editingArea, launchDate: e.target.value })}
                          className="w-full p-3 rounded-lg border border-border bg-background"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingArea(null)
                        setIsCreating(false)
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => saveArea(editingArea)}
                      className="flex-1"
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Lista de Áreas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {areas.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma área de cobertura cadastrada.</p>
                  <p className="text-sm">Clique em "Nova Área" para adicionar.</p>
                </div>
              ) : (
                areas.map((area) => {
                  const statusInfo = getStatusInfo(area.status)
                  const StatusIcon = statusInfo.icon
                  
                  return (
                    <div
                      key={area.id}
                      className="p-4 rounded-xl border border-border bg-card/50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{area.city}</h3>
                          <p className="text-sm text-muted-foreground">{area.state}</p>
                        </div>
                        <div className={`${statusInfo.color} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                          <StatusIcon size={12} />
                          {statusInfo.label}
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1 mb-4">
                        <p>📍 {area.latitude.toFixed(6)}, {area.longitude.toFixed(6)}</p>
                        {area.launchDate && (
                          <p>📅 Lançamento: {new Date(area.launchDate).toLocaleDateString('pt-BR')}</p>
                        )}
                        {area.description && (
                          <p className="truncate">📝 {area.description}</p>
                        )}
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-border">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingArea(area)
                            setIsCreating(false)
                          }}
                          className="flex-1"
                        >
                          <Edit size={14} className="mr-1" /> Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteArea(area.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
