"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Phone, Mail, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  city: string
  status: string
  created_at: string
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads')
      const data = await res.json()
      if (data.success) {
        setLeads(data.data || [])
      }
    } catch (error) {
      console.error('Erro ao buscar leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        fetchLeads()
        toast.success(`Status do lead atualizado para ${getStatusLabel(newStatus)}`)
      } else {
        toast.error('Erro ao atualizar status do lead')
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast.error('Erro ao atualizar status do lead')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'contacted':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'converted':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'lost':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'Novo'
      case 'contacted':
        return 'Contatado'
      case 'converted':
        return 'Convertido'
      case 'lost':
        return 'Perdido'
      default:
        return status
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
          <h1 className="text-2xl font-bold mt-4">Gerenciar Leads</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum lead encontrado</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold">{lead.name}</h3>
                      <span
                        className={`inline-block px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(lead.status)}`}
                      >
                        {getStatusLabel(lead.status)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-muted-foreground" />
                        <a
                          href={`tel:${lead.phone}`}
                          className="hover:text-primary transition"
                        >
                          {lead.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-muted-foreground" />
                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:text-primary transition"
                        >
                          {lead.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={14} className="text-muted-foreground" />
                        <span>{lead.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={14} />
                        <span>
                          {new Date(lead.created_at).toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {lead.status === 'new' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(lead.id, 'contacted')}
                      >
                        Marcar como Contatado
                      </Button>
                    )}
                    {lead.status === 'contacted' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(lead.id, 'converted')}
                        >
                          Converter
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(lead.id, 'lost')}
                        >
                          Perdido
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
