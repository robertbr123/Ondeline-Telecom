"use client"

import { useEffect, useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, TrendingUp, Users, Target, Calendar, Eye, FileText, BarChart3 } from 'lucide-react'
import Link from 'next/link'

interface AnalyticsData {
  leads: {
    total: number
    totalAllTime: number
    byStatus: Record<string, number>
    byCity: Record<string, number>
    byDay: { date: string; count: number }[]
    conversionRate: number
    newToday: number
  }
  blog: {
    totalPosts: number
    totalViews: number
    topPosts: { title: string; slug: string; views: number; category: string }[]
    byCategory: Record<string, number>
  }
  plans: {
    popularity: { plan: string; count: number }[]
  }
}

function MiniBarChart({ data, color = "bg-cyan-500" }: { data: { label: string; value: number }[]; color?: string }) {
  const maxVal = Math.max(...data.map(d => d.value), 1)
  return (
    <div className="flex items-end gap-1 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] text-muted-foreground">{d.value || ""}</span>
          <div
            className={`w-full ${color} rounded-t transition-all duration-500 min-h-[2px]`}
            style={{ height: `${Math.max((d.value / maxVal) * 100, 2)}%` }}
            title={`${d.label}: ${d.value}`}
          />
          <span className="text-[10px] text-muted-foreground truncate max-w-full">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

function HorizontalBar({ items, colors }: { items: { label: string; value: number }[]; colors: string[] }) {
  const maxVal = Math.max(...items.map(i => i.value), 1)
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-foreground">{item.label}</span>
            <span className="font-semibold">{item.value}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-700 ${colors[i % colors.length]}`}
              style={{ width: `${Math.max((item.value / maxVal) * 100, 3)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const statusLabels: Record<string, string> = {
  new: 'Novos',
  contacted: 'Contatados',
  converted: 'Convertidos',
  lost: 'Perdidos',
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500',
  contacted: 'bg-yellow-500',
  converted: 'bg-green-500',
  lost: 'bg-red-500',
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d')

  useEffect(() => {
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
    setLoading(true)
    fetch(`/api/admin/analytics?days=${days}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) setData(res.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [dateRange])

  // Prepare chart data for leads by day (show last N entries based on range)
  const dailyChartData = useMemo(() => {
    if (!data) return []
    const entries = data.leads.byDay
    // Show only last portion for readability
    const show = dateRange === '7d' ? entries : entries.slice(-15)
    return show.map(d => ({
      label: d.date.substring(5), // MM-DD
      value: d.count,
    }))
  }, [data, dateRange])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex justify-center items-center h-64">
          <div className="text-muted-foreground">Carregando analytics...</div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex justify-center items-center h-64">
          <div className="text-muted-foreground">Erro ao carregar dados</div>
        </div>
      </div>
    )
  }

  const cityData = Object.entries(data.leads.byCity).map(([label, value]) => ({ label, value }))
  const statusData = Object.entries(data.leads.byStatus).map(([key, value]) => ({
    label: statusLabels[key] || key,
    value,
  }))

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
          <h1 className="text-2xl font-bold mt-4">Analytics</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Date range filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(['7d', '30d', '90d'] as const).map(range => (
            <Button
              key={range}
              variant={dateRange === range ? 'default' : 'outline'}
              onClick={() => setDateRange(range)}
              size="sm"
            >
              {range === '7d' ? '7 dias' : range === '30d' ? '30 dias' : '90 dias'}
            </Button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl border border-border bg-card/50">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-cyan-500" />
              <span className="text-xs text-muted-foreground">Total de Leads</span>
            </div>
            <div className="text-2xl font-bold">{data.leads.total}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {data.leads.totalAllTime} total (histórico)
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border bg-card/50">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">Novos Hoje</span>
            </div>
            <div className="text-2xl font-bold text-blue-500">{data.leads.newToday}</div>
          </div>

          <div className="p-5 rounded-xl border border-border bg-card/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-muted-foreground">Taxa de Conversão</span>
            </div>
            <div className="text-2xl font-bold text-green-500">{data.leads.conversionRate}%</div>
          </div>

          <div className="p-5 rounded-xl border border-border bg-card/50">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-violet-500" />
              <span className="text-xs text-muted-foreground">Views do Blog</span>
            </div>
            <div className="text-2xl font-bold text-violet-500">{data.blog.totalViews}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {data.blog.totalPosts} posts publicados
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Leads per day chart */}
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <h2 className="font-semibold">Leads por Dia</h2>
            </div>
            {dailyChartData.length > 0 ? (
              <MiniBarChart data={dailyChartData} color="bg-cyan-500" />
            ) : (
              <p className="text-sm text-muted-foreground">Sem dados no período</p>
            )}
          </div>

          {/* Leads by status */}
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h2 className="font-semibold mb-4">Leads por Status</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(data.leads.byStatus).map(([status, count]) => (
                <div key={status} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                  <div className={`w-3 h-3 rounded-full ${statusColors[status] || 'bg-gray-500'}`} />
                  <div>
                    <div className="text-lg font-bold">{count}</div>
                    <div className="text-xs text-muted-foreground">{statusLabels[status] || status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Leads by city */}
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h2 className="font-semibold mb-4">Leads por Cidade</h2>
            <HorizontalBar
              items={cityData}
              colors={['bg-cyan-500', 'bg-blue-500', 'bg-emerald-500', 'bg-violet-500']}
            />
          </div>

          {/* Plans popularity */}
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <h2 className="font-semibold">Planos Mais Procurados</h2>
            </div>
            {data.plans.popularity.length > 0 ? (
              <HorizontalBar
                items={data.plans.popularity.map(p => ({ label: p.plan, value: p.count }))}
                colors={['bg-emerald-500', 'bg-cyan-500', 'bg-blue-500', 'bg-violet-500']}
              />
            ) : (
              <p className="text-sm text-muted-foreground">Sem dados de planos nos leads</p>
            )}
          </div>
        </div>

        {/* Blog section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top posts */}
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <h2 className="font-semibold">Posts Mais Lidos</h2>
            </div>
            {data.blog.topPosts.length > 0 ? (
              <div className="space-y-3">
                {data.blog.topPosts.map((post, i) => (
                  <div key={post.slug} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{post.title}</div>
                        <div className="text-xs text-muted-foreground">{post.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-violet-500 shrink-0 ml-2">
                      <Eye className="w-3 h-3" />
                      {post.views}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum post publicado</p>
            )}
          </div>

          {/* Blog by category */}
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h2 className="font-semibold mb-4">Posts por Categoria</h2>
            {Object.keys(data.blog.byCategory).length > 0 ? (
              <HorizontalBar
                items={Object.entries(data.blog.byCategory).map(([label, value]) => ({ label, value }))}
                colors={['bg-violet-500', 'bg-pink-500', 'bg-amber-500', 'bg-emerald-500']}
              />
            ) : (
              <p className="text-sm text-muted-foreground">Sem categorias</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
