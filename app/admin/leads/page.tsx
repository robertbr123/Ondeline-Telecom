"use client"

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CalendarDays, Clock, Flame, Mail, MapPin, MessageCircle, Phone, Snowflake, Sun } from 'lucide-react'
import Link from 'next/link'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  city: string
  status: string
  score: number
  plan_interest?: string
  coupon_code?: string
  source?: string
  notes?: string
  last_contact_at?: string
  installation_date?: string
  created_at: string
  updated_at?: string
}

const columns = [
  { key: 'new', label: 'Novo', tone: 'blue' },
  { key: 'contacted', label: 'Em contato', tone: 'amber' },
  { key: 'installation_scheduled', label: 'Aguardando instalação', tone: 'violet' },
  { key: 'installed', label: 'Instalado', tone: 'emerald' },
  { key: 'lost', label: 'Perdido', tone: 'red' },
] as const

const nextStatus: Record<string, string> = {
  new: 'contacted',
  contacted: 'installation_scheduled',
  installation_scheduled: 'installed',
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, '')
}

function getScoreBadge(score = 0) {
  if (score >= 70) return { label: 'Quente', icon: Flame, color: 'text-red-600 bg-red-50 border-red-200' }
  if (score >= 40) return { label: 'Morno', icon: Sun, color: 'text-amber-600 bg-amber-50 border-amber-200' }
  return { label: 'Frio', icon: Snowflake, color: 'text-blue-600 bg-blue-50 border-blue-200' }
}

function formatDate(value?: string) {
  if (!value) return 'Sem registro'
  return new Date(value).toLocaleString('pt-BR')
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [saving, setSaving] = useState(false)

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

  const grouped = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.key] = leads
        .filter((lead) => (lead.status || 'new') === column.key)
        .sort((a, b) => (b.score || 0) - (a.score || 0) || new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      return acc
    }, {} as Record<string, Lead[]>)
  }, [leads])

  const updateLead = async (lead: Lead, updates: Partial<Lead>) => {
    const payload = {
      status: updates.status || lead.status || 'new',
      notes: updates.notes ?? lead.notes,
      last_contact_at: updates.last_contact_at ?? lead.last_contact_at,
      installation_date: updates.installation_date ?? lead.installation_date,
      source: updates.source ?? lead.source,
      plan_interest: updates.plan_interest ?? lead.plan_interest,
    }

    const res = await fetch(`/api/leads/${lead.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error('Erro ao atualizar lead')
    }

    await fetchLeads()
  }

  const moveLead = async (lead: Lead, status: string) => {
    await updateLead(lead, {
      status,
      last_contact_at: status === 'contacted' ? new Date().toISOString() : lead.last_contact_at,
    })
  }

  const saveDetails = async () => {
    if (!selectedLead) return
    setSaving(true)
    try {
      await updateLead(selectedLead, selectedLead)
      setSelectedLead(null)
    } catch {
      alert('Erro ao salvar o lead.')
    } finally {
      setSaving(false)
    }
  }

  const whatsappUrl = (lead: Lead) => {
    const phone = onlyDigits(lead.phone)
    const message = `Olá, ${lead.name}! Aqui é da Ondeline Telecom. Recebemos seu interesse${lead.plan_interest ? ` no plano ${lead.plan_interest}` : ''} em ${lead.city}. Posso confirmar a disponibilidade no seu endereço?`
    return `https://wa.me/55${phone.startsWith('55') ? phone.slice(2) : phone}?text=${encodeURIComponent(message)}`
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white">
        <div className="max-w-[1480px] mx-auto px-4 py-4">
          <Link href="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
            <ArrowLeft size={16} /> Voltar
          </Link>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mt-4">
            <div>
              <h1 className="text-2xl font-bold">Kanban de Leads</h1>
              <p className="text-sm text-muted-foreground">Acompanhe o lead do primeiro contato até a instalação.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-border px-3 py-1">{leads.length} leads</span>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">{grouped.installed?.length || 0} instalados</span>
              <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-red-700">{grouped.lost?.length || 0} perdidos</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1480px] mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Carregando...</div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">
            {columns.map((column) => (
              <section key={column.key} className="rounded-2xl border border-border bg-muted/30 p-3 min-h-[520px]">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-semibold">{column.label}</h2>
                  <span className="rounded-full bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                    {grouped[column.key]?.length || 0}
                  </span>
                </div>

                <div className="space-y-3">
                  {(grouped[column.key] || []).map((lead) => {
                    const badge = getScoreBadge(lead.score)
                    const ScoreIcon = badge.icon
                    return (
                      <article key={lead.id} className="rounded-xl border border-border bg-white p-4 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold leading-tight">{lead.name}</h3>
                            <p className="mt-1 text-xs text-muted-foreground">{lead.city} · {lead.source || 'Site'}</p>
                          </div>
                          <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold ${badge.color}`}>
                            <ScoreIcon size={12} /> {lead.score || 0}
                          </span>
                        </div>

                        <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                          <p className="flex items-center gap-1.5"><Phone size={12} /> {lead.phone}</p>
                          {lead.email && <p className="flex items-center gap-1.5"><Mail size={12} /> {lead.email}</p>}
                          {lead.plan_interest && <p className="flex items-center gap-1.5"><MapPin size={12} /> Plano: {lead.plan_interest}</p>}
                          <p className="flex items-center gap-1.5"><Clock size={12} /> Criado: {formatDate(lead.created_at)}</p>
                          {lead.installation_date && <p className="flex items-center gap-1.5"><CalendarDays size={12} /> Instalação: {formatDate(lead.installation_date)}</p>}
                        </div>

                        {lead.notes && (
                          <p className="mt-3 line-clamp-2 rounded-lg bg-muted/60 p-2 text-xs text-muted-foreground">{lead.notes}</p>
                        )}

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <a
                            href={whatsappUrl(lead)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 rounded-md bg-emerald-600 px-2 py-2 text-xs font-semibold text-white"
                            onClick={() => moveLead(lead, lead.status === 'new' ? 'contacted' : lead.status)}
                          >
                            <MessageCircle size={13} /> WhatsApp
                          </a>
                          <Button size="sm" variant="outline" onClick={() => setSelectedLead(lead)}>
                            Detalhes
                          </Button>
                          {nextStatus[lead.status] && (
                            <Button size="sm" className="col-span-2" onClick={() => moveLead(lead, nextStatus[lead.status])}>
                              Avançar para {columns.find((item) => item.key === nextStatus[lead.status])?.label}
                            </Button>
                          )}
                          {lead.status !== 'lost' && lead.status !== 'installed' && (
                            <Button size="sm" variant="outline" className="col-span-2 text-red-600" onClick={() => moveLead(lead, 'lost')}>
                              Marcar como perdido
                            </Button>
                          )}
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">{selectedLead.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedLead.city} · {selectedLead.phone}</p>
              </div>
              <a href={whatsappUrl(selectedLead)} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                Abrir WhatsApp
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Status</label>
                <select
                  value={selectedLead.status}
                  onChange={(event) => setSelectedLead({ ...selectedLead, status: event.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                >
                  {columns.map((column) => (
                    <option key={column.key} value={column.key}>{column.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Plano de interesse</label>
                <input
                  value={selectedLead.plan_interest || ''}
                  onChange={(event) => setSelectedLead({ ...selectedLead, plan_interest: event.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                  placeholder="Ex: Fluxo 600 Mega"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Origem</label>
                <input
                  value={selectedLead.source || ''}
                  onChange={(event) => setSelectedLead({ ...selectedLead, source: event.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                  placeholder="Site, Campanha, WhatsApp..."
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Instalação agendada</label>
                <input
                  type="datetime-local"
                  value={selectedLead.installation_date ? selectedLead.installation_date.slice(0, 16) : ''}
                  onChange={(event) => setSelectedLead({ ...selectedLead, installation_date: event.target.value ? new Date(event.target.value).toISOString() : '' })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">Histórico / observações</label>
              <textarea
                value={selectedLead.notes || ''}
                onChange={(event) => setSelectedLead({ ...selectedLead, notes: event.target.value })}
                className="min-h-32 w-full rounded-lg border border-border bg-background px-3 py-2"
                placeholder="Ex: Cliente pediu retorno amanhã. Rua próxima ao centro. Confirmar disponibilidade."
              />
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedLead(null)}>
                Cancelar
              </Button>
              <Button className="flex-1" disabled={saving} onClick={saveDetails}>
                {saving ? 'Salvando...' : 'Salvar lead'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
