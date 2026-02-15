"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Pencil, Trash2, Check, X, Building2 } from 'lucide-react'
import { toast } from 'sonner'
import { submitAPI } from '@/hooks/useAPI'
import { LoadingSpinner, LoadingTable } from '@/components/loading'
import Image from 'next/image'

interface Client {
  id: string
  name: string
  logo: string
  bg_color: string
  order: number
  active: boolean
  created_at?: string
  updated_at?: string
}

export default function AdminClientsPage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients?includeInactive=true')
      const data = await res.json()
      if (data.success) {
        setClients(data.data || [])
      }
    } catch (error) {
      toast.error('Erro ao carregar clientes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este cliente?')) return

    const result = await submitAPI(`/api/clients/${id}`, 'DELETE')
    if (result.success) {
      fetchClients()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = {
      name: formData.get('name') as string,
      logo: formData.get('logo') as string,
      bgColor: formData.get('bgColor') as string,
      order: parseInt(formData.get('order') as string) || 0,
      active: formData.get('active') === 'on' ? 1 : 0,
    }

    const result = editingClient
      ? await submitAPI(`/api/clients/${editingClient.id}`, 'PUT', data)
      : await submitAPI('/api/clients', 'POST', data)

    if (result.success) {
      setIsModalOpen(false)
      setEditingClient(null)
      fetchClients()
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
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Building2 size={24} />
              Gerenciar Clientes/Empresas
            </h1>
          </div>
          <Button
            onClick={() => {
              setEditingClient(null)
              setIsModalOpen(true)
            }}
            className="flex items-center gap-2"
          >
            <Plus size={18} /> Novo Cliente
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <LoadingTable />
        ) : (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4">Logo</th>
                  <th className="text-left p-4">Nome</th>
                  <th className="text-left p-4">Cor de Fundo</th>
                  <th className="text-left p-4">Ordem</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-t border-border hover:bg-muted/50">
                    <td className="p-4">
                      <div className="w-24 h-16 relative bg-white rounded border border-border flex items-center justify-center p-2">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          width={80}
                          height={40}
                          className="object-contain max-h-12"
                          unoptimized
                        />
                      </div>
                    </td>
                    <td className="p-4 font-medium">{client.name}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded ${client.bg_color} border border-border`}></div>
                        <code className="text-xs">{client.bg_color}</code>
                      </div>
                    </td>
                    <td className="p-4">{client.order}</td>
                    <td className="p-4">
                      {client.active ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <Check size={16} /> Ativo
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600">
                          <X size={16} /> Inativo
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingClient(client)
                            setIsModalOpen(true)
                          }}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(client.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-bold">
                {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome *</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingClient?.name}
                  className="w-full p-2 border border-border rounded-md bg-background"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  URL da Logo * <span className="text-xs text-muted-foreground">(link completo da imagem)</span>
                </label>
                <input
                  type="url"
                  name="logo"
                  defaultValue={editingClient?.logo}
                  className="w-full p-2 border border-border rounded-md bg-background"
                  placeholder="https://exemplo.com/logo.png"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Cor de Fundo <span className="text-xs text-muted-foreground">(classe Tailwind)</span>
                </label>
                <input
                  type="text"
                  name="bgColor"
                  defaultValue={editingClient?.bg_color || 'bg-white'}
                  className="w-full p-2 border border-border rounded-md bg-background"
                  placeholder="bg-white, bg-gray-50, bg-blue-50, etc."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Exemplos: bg-white, bg-gray-50, bg-blue-50, bg-green-50
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ordem de Exibição</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={editingClient?.order || 0}
                  className="w-full p-2 border border-border rounded-md bg-background"
                  min="0"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Menor número aparece primeiro
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="active"
                  id="active"
                  defaultChecked={editingClient?.active !== false}
                  className="w-4 h-4"
                />
                <label htmlFor="active" className="text-sm font-medium">
                  Cliente ativo (visível no site)
                </label>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingClient(null)
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingClient ? 'Salvar Alterações' : 'Criar Cliente'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
