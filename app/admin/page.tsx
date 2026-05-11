"use client"

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AlertTriangle, BarChart3, BookOpen, Building2, Edit, FileSearch, HelpCircle, LayoutDashboard, LogOut, MapPin, Megaphone, Package, Settings, Sparkles, Tag, Users } from 'lucide-react'

interface Lead {
  id: string
  name: string
  city: string
  status: string
  score?: number
  updated_at?: string
  created_at: string
}

interface Campaign {
  title: string
  slug: string
  active: boolean | number
  views?: number
  leads_count?: number
}

const funnel = [
  { key: 'new', label: 'Novos', color: 'bg-blue-500' },
  { key: 'contacted', label: 'Contatados', color: 'bg-amber-500' },
  { key: 'installation_scheduled', label: 'Aguardando instalação', color: 'bg-violet-500' },
  { key: 'installed', label: 'Instalados', color: 'bg-emerald-500' },
  { key: 'lost', label: 'Perdidos', color: 'bg-red-500' },
]

const shortcuts = [
  { href: '/admin/leads', icon: Users, title: 'Kanban de Leads', text: 'Operar atendimento e instalação' },
  { href: '/admin/campaigns', icon: Megaphone, title: 'Campanhas', text: 'Criar landing pages promocionais' },
  { href: '/admin/settings', icon: Settings, title: 'Banners e Site', text: 'Trocar hero, contato, logo e SEO' },
  { href: '/admin/coverage', icon: MapPin, title: 'Cobertura', text: 'Gerenciar cidades e previsão' },
  { href: '/admin/seo', icon: FileSearch, title: 'SEO Local', text: 'Auditar páginas e keywords' },
  { href: '/admin/plans', icon: Package, title: 'Planos', text: 'Editar preços e benefícios' },
  { href: '/admin/analytics', icon: BarChart3, title: 'Analytics', text: 'Ver conversão e origem dos leads' },
  { href: '/admin/blog', icon: BookOpen, title: 'Blog', text: 'Conteúdo e notícias' },
  { href: '/admin/faq', icon: HelpCircle, title: 'FAQ', text: 'Perguntas frequentes' },
  { href: '/admin/features', icon: Sparkles, title: 'Features', text: 'Diferenciais do site' },
  { href: '/admin/clients', icon: Building2, title: 'Clientes', text: 'Marcas atendidas' },
  { href: '/admin/coupons', icon: Tag, title: 'Cupons', text: 'Promoções e descontos' },
  { href: '/admin/pages', icon: Edit, title: 'Páginas CMS', text: 'Conteúdo institucional' },
]

function isActiveCampaign(campaign: Campaign) {
  return campaign.active === true || campaign.active === 1
}

export default function AdminDashboard() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [plansCount, setPlansCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [leadsRes, plansRes, campaignsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/plans'),
        fetch('/api/campaigns'),
      ])

      const [leadsData, plansData, campaignsData] = await Promise.all([
        leadsRes.json(),
        plansRes.json(),
        campaignsRes.json(),
      ])

      if (leadsData.success) setLeads(leadsData.data || [])
      if (plansData.success) setPlansCount(plansData.data?.length || 0)
      if (campaignsData.success) setCampaigns(campaignsData.data || [])
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  const metrics = useMemo(() => {
    const counts = funnel.reduce((acc, item) => {
      acc[item.key] = leads.filter((lead) => (lead.status || 'new') === item.key).length
      return acc
    }, {} as Record<string, number>)

    const highScore = leads.filter((lead) => (lead.score || 0) >= 70 && !['installed', 'lost'].includes(lead.status)).length
    const stale = leads.filter((lead) => {
      if (['installed', 'lost'].includes(lead.status)) return false
      const base = new Date(lead.updated_at || lead.created_at).getTime()
      return Date.now() - base > 24 * 60 * 60 * 1000
    })

    const byCity = leads.reduce((acc, lead) => {
      acc[lead.city] = (acc[lead.city] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      counts,
      activePipeline: leads.filter((lead) => !['installed', 'lost'].includes(lead.status)).length,
      installed: counts.installed || 0,
      conversion: leads.length ? Math.round(((counts.installed || 0) / leads.length) * 100) : 0,
      highScore,
      stale,
      topCities: Object.entries(byCity).sort((a, b) => b[1] - a[1]).slice(0, 4),
    }
  }, [leads])

  const bestCampaign = campaigns
    .filter(isActiveCampaign)
    .sort((a, b) => (b.leads_count || 0) - (a.leads_count || 0))[0]

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white" style={{ boxShadow: '0 1px 0 #e5e9ef' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo-ondeline.png" alt="Ondeline" width={120} height={32} style={{ height: 32, width: 'auto' }} />
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">Admin comercial</span>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} /> Sair
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Painel comercial</h1>
            <p className="text-muted-foreground">Funil, alertas e atalhos para vender e instalar mais rápido.</p>
          </div>
          <a href="/admin/leads" className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            Abrir Kanban
          </a>
        </div>

        {loading ? (
          <div className="py-16 text-center text-muted-foreground">Carregando...</div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-border bg-card/50 p-5">
                <span className="text-xs text-muted-foreground">Leads no funil</span>
                <div className="mt-2 text-3xl font-bold">{metrics.activePipeline}</div>
              </div>
              <div className="rounded-xl border border-border bg-card/50 p-5">
                <span className="text-xs text-muted-foreground">Instalados</span>
                <div className="mt-2 text-3xl font-bold text-emerald-600">{metrics.installed}</div>
              </div>
              <div className="rounded-xl border border-border bg-card/50 p-5">
                <span className="text-xs text-muted-foreground">Conversão</span>
                <div className="mt-2 text-3xl font-bold text-cyan-600">{metrics.conversion}%</div>
              </div>
              <div className="rounded-xl border border-border bg-card/50 p-5">
                <span className="text-xs text-muted-foreground">Planos cadastrados</span>
                <div className="mt-2 text-3xl font-bold">{plansCount}</div>
              </div>
            </div>

            <section className="mt-6 rounded-2xl border border-border bg-white p-5">
              <div className="mb-4 flex items-center gap-2">
                <LayoutDashboard size={18} className="text-primary" />
                <h2 className="font-semibold">Funil de vendas</h2>
              </div>
              <div className="grid gap-3 md:grid-cols-5">
                {funnel.map((step) => (
                  <div key={step.key} className="rounded-xl border border-border bg-muted/30 p-4">
                    <div className={`mb-3 h-1.5 rounded-full ${step.color}`} />
                    <div className="text-2xl font-bold">{metrics.counts[step.key] || 0}</div>
                    <div className="text-sm text-muted-foreground">{step.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_.9fr]">
              <section className="rounded-2xl border border-border bg-white p-5">
                <div className="mb-4 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-amber-500" />
                  <h2 className="font-semibold">Alertas do dia</h2>
                </div>
                <div className="space-y-3">
                  <a href="/admin/leads" className="block rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    <strong>{metrics.stale.length} leads sem atualização há mais de 24h.</strong>
                    <span className="mt-1 block">Priorize contato para não esfriar oportunidade.</span>
                  </a>
                  <a href="/admin/leads" className="block rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                    <strong>{metrics.highScore} leads quentes em aberto.</strong>
                    <span className="mt-1 block">Abra o Kanban e chame no WhatsApp primeiro.</span>
                  </a>
                  <a href="/admin/campaigns" className="block rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-900">
                    <strong>{bestCampaign ? `Campanha destaque: ${bestCampaign.title}` : 'Nenhuma campanha ativa em destaque.'}</strong>
                    <span className="mt-1 block">{bestCampaign ? `${bestCampaign.leads_count || 0} leads e ${bestCampaign.views || 0} visualizações.` : 'Crie uma promoção para medir tráfego e conversão.'}</span>
                  </a>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-white p-5">
                <h2 className="mb-4 font-semibold">Demanda por cidade</h2>
                <div className="space-y-3">
                  {metrics.topCities.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Sem leads por enquanto.</p>
                  ) : metrics.topCities.map(([city, count]) => (
                    <div key={city}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>{city}</span>
                        <strong>{count}</strong>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.max((count / Math.max(...metrics.topCities.map(([, value]) => value))) * 100, 8)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {shortcuts.map((item) => {
                const Icon = item.icon
                return (
                  <a key={item.href} href={item.href} className="rounded-xl border border-border bg-card/50 p-5 transition hover:border-primary/50 hover:bg-white">
                    <Icon className="mb-3 h-6 w-6 text-primary" />
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                  </a>
                )
              })}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
