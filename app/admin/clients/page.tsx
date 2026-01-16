"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Trash2, Edit, Building2, Image as ImageIcon, GripVertical } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Client {
  id: string
  name: string
  logo: string
  website?: string
  active: boolean
  order: number
}

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients')
      const data = await res.json()
      if (data.success) {
        setClients(data.data || [])
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = () => {
    setIsCreating(true)
    setEditingClient({
      id: '',
      name: '',
      logo: '',
      website: '',
      active: true,
      order: clients.length + 1,
    })
  }

  const saveClient = async (client: Client) => {
    try {
      const method = isCreating ? 'POST' : 'PUT'
      const url = isCreating ? '/api/clients' : `/api/clients/${client.id}`
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      })

      if (res.ok) {
        fetchClients()
        setEditingClient(null)
        setIsCreating(false)
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error)
    }
  }

  const deleteClient = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return
    
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchClients()
      }
    } catch (error) {
      console.error('Erro ao excluir cliente:', error)
    }
  }

  const toggleActive = async (client: Client) => {
    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...client, active: !client.active }),
      })

      if (res.ok) {
        fetchClients()
      }
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error)
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
            <h1 className="text-2xl font-bold">Clientes & Parceiros</h1>
            <Button onClick={handleCreateNew} className="flex items-center gap-2">
              <Plus size={16} /> Novo Cliente
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
            {editingClient && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-card border border-border rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                  <h2 className="text-xl font-bold mb-6">
                    {isCreating ? 'Novo Cliente/Parceiro' : 'Editar Cliente/Parceiro'}
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome da Empresa</label>
                      <input
                        type="text"
                        value={editingClient.name}
                        onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                        className="w-full p-3 rounded-lg border border-border bg-background"
                        placeholder="Ex: Bradesco"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">URL do Logo</label>
                      <input
                        type="url"
                        value={editingClient.logo}
                        onChange={(e) => setEditingClient({ ...editingClient, logo: e.target.value })}
                        className="w-full p-3 rounded-lg border border-border bg-background"
                        placeholder="https://exemplo.com/logo.png"
                      />
                      {editingClient.logo && (
                        <div className="mt-2 p-4 bg-white rounded-lg flex items-center justify-center">
                          <Image
                            src={editingClient.logo}
                            alt="Preview"
                            width={120}
                            height={60}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Website (opcional)</label>
                      <input
                        type="url"
                        value={editingClient.website || ''}
                        onChange={(e) => setEditingClient({ ...editingClient, website: e.target.value })}
                        className="w-full p-3 rounded-lg border border-border bg-background"
                        placeholder="https://www.empresa.com.br"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Ordem de Exibição</label>
                      <input
                        type="number"
                        value={editingClient.order}
                        onChange={(e) => setEditingClient({ ...editingClient, order: parseInt(e.target.value) || 1 })}
                        className="w-full p-3 rounded-lg border border-border bg-background"
                        min="1"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="active"
                        checked={editingClient.active}
                        onChange={(e) => setEditingClient({ ...editingClient, active: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <label htmlFor="active" className="text-sm">Ativo (visível no site)</label>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingClient(null)
                        setIsCreating(false)
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={() => saveClient(editingClient)}
                      className="flex-1"
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Lista de Clientes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clients.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum cliente cadastrado ainda.</p>
                  <p className="text-sm">Clique em "Novo Cliente" para adicionar.</p>
                </div>
              ) : (
                clients.map((client) => (
                  <div
                    key={client.id}
                    className={`p-4 rounded-xl border ${
                      client.active ? 'border-border bg-card/50' : 'border-border/50 bg-card/20 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-lg bg-white border border-border flex items-center justify-center p-2 flex-shrink-0">
                        {client.logo ? (
                          <Image
                            src={client.logo}
                            alt={client.name}
                            width={60}
                            height={60}
                            className="object-contain"
                            unoptimized
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{client.name}</h3>
                        {client.website && (
                          <a
                            href={client.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline truncate block"
                          >
                            {client.website}
                          </a>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            client.active
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-gray-500/10 text-gray-500'
                          }`}>
                            {client.active ? 'Ativo' : 'Inativo'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Ordem: {client.order}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingClient(client)
                          setIsCreating(false)
                        }}
                        className="flex-1"
                      >
                        <Edit size={14} className="mr-1" /> Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActive(client)}
                        className="flex-1"
                      >
                        {client.active ? 'Desativar' : 'Ativar'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteClient(client.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
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
