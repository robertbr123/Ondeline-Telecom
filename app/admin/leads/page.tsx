"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Phone, Mail, MapPin, Clock, Flame, Snowflake, Sun } from 'lucide-react'
import Link from 'next/link'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  city: string
  status: string
  score: number
  created_at: string
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'date' | 'score'>('score')

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
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
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

  const getScoreBadge = (score: number) => {
    if (score >= 70) return { label: 'Quente', icon: Flame, color: 'text-red-500 bg-red-500/10 border-red-500/20' }
    if (score >= 40) return { label: 'Morno', icon: Sun, color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' }
    return { label: 'Frio', icon: Snowflake, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' }
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
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-2xl font-bold">Gerenciar Leads</h1>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={sortBy === 'score' ? 'default' : 'outline'}
                onClick={() => setSortBy('score')}
              >
                <Flame size={14} className="mr-1" /> Por Score
              </Button>
              <Button
                size="sm"
                variant={sortBy === 'date' ? 'default' : 'outline'}
                onClick={() => setSortBy('date')}
              >
                <Clock size={14} className="mr-1" /> Por Data
              </Button>
            </div>
          </div>
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
            {[...leads].sort((a, b) =>
              sortBy === 'score'
                ? (b.score || 0) - (a.score || 0)
                : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            ).map((lead) => (
              <div
                key={lead.id}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold">{lead.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`inline-block px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(lead.status)}`}
                        >
                          {getStatusLabel(lead.status)}
                        </span>
                        {lead.score > 0 && (() => {
                          const badge = getScoreBadge(lead.score)
                          const Icon = badge.icon
                          return (
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${badge.color}`}>
                              <Icon size={12} />
                              {badge.label} ({lead.score})
                            </span>
                          )
                        })()}
                      </div>
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
