"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, TrendingUp, Users, Target, Calendar } from 'lucide-react'
import Link from 'next/link'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  city: string
  status: string
  created_at: string
}

interface Stats {
  totalLeads: number
  newLeads: number
  contactedLeads: number
  convertedLeads: number
  lostLeads: number
  conversionRate: number
  leadsByCity: { [key: string]: number }
  leadsByDay: { date: string; count: number }[]
  leadsByStatus: { [key: string]: number }
}

export default function AdminAnalytics() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('7d')

  useEffect(() => {
    fetchData()
  }, [dateRange])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/leads')
      const data = await res.json()
      if (data.success) {
        setLeads(data.data || [])
        calculateStats(data.data || [])
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (leadsData: Lead[]) => {
    const now = new Date()
    const startDate = new Date()
    
    switch (dateRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
    }

    const filteredLeads = leadsData.filter(lead => 
      new Date(lead.created_at) >= startDate
    )

    const totalLeads = filteredLeads.length
    const newLeads = filteredLeads.filter(l => l.status === 'new').length
    const contactedLeads = filteredLeads.filter(l => l.status === 'contacted').length
    const convertedLeads = filteredLeads.filter(l => l.status === 'converted').length
    const lostLeads = filteredLeads.filter(l => l.status === 'lost').length
    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0'

    // Leads por cidade
    const leadsByCity: { [key: string]: number } = {}
    filteredLeads.forEach(lead => {
      leadsByCity[lead.city] = (leadsByCity[lead.city] || 0) + 1
    })

    // Leads por dia
    const leadsByDay: { date: string; count: number }[] = []
    const daysMap: { [key: string]: number } = {}
    
    filteredLeads.forEach(lead => {
      const date = new Date(lead.created_at).toLocaleDateString('pt-BR')
      daysMap[date] = (daysMap[date] || 0) + 1
    })

    Object.keys(daysMap).forEach(date => {
      leadsByDay.push({ date, count: daysMap[date] })
    })
    leadsByDay.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Leads por status
    const leadsByStatus: { [key: string]: number } = {
      new: newLeads,
      contacted: contactedLeads,
      converted: convertedLeads,
      lost: lostLeads
    }

    setStats({
      totalLeads,
      newLeads,
      contactedLeads,
      convertedLeads,
      lostLeads,
      conversionRate: parseFloat(conversionRate as string),
      leadsByCity,
      leadsByDay,
      leadsByStatus
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500'
      case 'contacted': return 'bg-yellow-500'
      case 'converted': return 'bg-green-500'
      case 'lost': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getCityNames = () => {
    return ['Ipixuna', 'Eirunepe', 'Itamarati', 'Carauari']
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex justify-center items-center h-64">
          <div className="text-muted-foreground">Carregando analytics...</div>
        </div>
      </div>
    )
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
          <h1 className="text-2xl font-bold mt-4">Analytics Avançado</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filtros de Data */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            variant={dateRange === '7d' ? 'default' : 'outline'}
            onClick={() => setDateRange('7d')}
          >
            Últimos 7 dias
          </Button>
          <Button
            variant={dateRange === '30d' ? 'default' : 'outline'}
            onClick={() => setDateRange('30d')}
          >
            Últimos 30 dias
          </Button>
          <Button
            variant={dateRange === '90d' ? 'default' : 'outline'}
            onClick={() => setDateRange('90d')}
          >
            Últimos 90 dias
          </Button>
        </div>

        {stats && (
          <>
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="p-6 rounded-xl border border-border bg-card/50">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Total de Leads</span>
                </div>
                <div className="text-3xl font-bold">{stats.totalLeads}</div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card/50">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-muted-foreground">Novos Leads</span>
                </div>
                <div className="text-3xl font-bold text-secondary">{stats.newLeads}</div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card/50">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Taxa de Conversão</span>
                </div>
                <div className="text-3xl font-bold text-accent">{stats.conversionRate}%</div>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card/50">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Convertidos</span>
                </div>
                <div className="text-3xl font-bold text-primary">{stats.convertedLeads}</div>
              </div>
            </div>

            {/* Gráfico de Leads por Dia */}
            <div className="mb-8 p-6 rounded-xl border border-border bg-card/50">
              <h2 className="text-xl font-semibold mb-4">Leads por Dia</h2>
              <div className="h-64 flex items-end gap-1">
                {stats.leadsByDay.map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary/80 hover:bg-primary transition-colors rounded-t"
                      style={{
                        height: `${Math.max((day.count / Math.max(...stats.leadsByDay.map(d => d.count))) * 100, 5)}%`,
                      }}
                      title={`${day.date}: ${day.count} leads`}
                    />
                    <div className="text-xs text-muted-foreground mt-1 -rotate-45 origin-bottom-left">
                      {day.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico de Leads por Cidade */}
            <div className="mb-8 p-6 rounded-xl border border-border bg-card/50">
              <h2 className="text-xl font-semibold mb-4">Leads por Cidade</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getCityNames().map(city => (
                  <div key={city} className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {stats.leadsByCity[city] || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">{city}</div>
                    <div className="mt-2 w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.max((stats.leadsByCity[city] || 0) / Math.max(...Object.values(stats.leadsByCity)) * 100, 5)}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gráfico de Leads por Status */}
            <div className="mb-8 p-6 rounded-xl border border-border bg-card/50">
              <h2 className="text-xl font-semibold mb-4">Leads por Status</h2>
              <div className="flex flex-wrap gap-4">
                {Object.entries(stats.leadsByStatus).map(([status, count]) => (
                  <div key={status} className="flex-1 min-w-[200px] p-4 rounded-lg bg-background/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="capitalize font-semibold">{status === 'new' ? 'Novos' : status === 'contacted' ? 'Contatados' : status === 'converted' ? 'Convertidos' : 'Perdidos'}</span>
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(status)}`}></div>
                    </div>
                    <div className="text-3xl font-bold">{count}</div>
                    <div className="text-sm text-muted-foreground">
                      {((count / stats.totalLeads) * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detalhamento */}
            <div className="p-6 rounded-xl border border-border bg-card/50">
              <h2 className="text-xl font-semibold mb-4">Resumo Detalhado</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Total de Leads</span>
                  <span className="font-semibold">{stats.totalLeads}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Novos Leads</span>
                  <span className="font-semibold">{stats.newLeads}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Contatados</span>
                  <span className="font-semibold">{stats.contactedLeads}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Convertidos</span>
                  <span className="font-semibold text-green-500">{stats.convertedLeads}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50">
                  <span className="text-muted-foreground">Perdidos</span>
                  <span className="font-semibold text-red-500">{stats.lostLeads}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-background/50 border border-primary/30">
                  <span className="text-muted-foreground font-semibold">Taxa de Conversão</span>
                  <span className="font-bold text-primary text-xl">{stats.conversionRate}%</span>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
