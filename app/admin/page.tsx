"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut, Users, LayoutDashboard, Package, MessageSquare, Settings, BarChart3, FileText, BookOpen, Building2, HelpCircle, MapPin, Sparkles, Edit } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeLeads: 0,
    convertedLeads: 0,
    totalPlans: 0,
    totalFAQ: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [leadsRes, plansRes, faqRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/plans'),
        fetch('/api/faq'),
      ])

      const leadsData = await leadsRes.json()
      const plansData = await plansRes.json()
      const faqData = await faqRes.json()

      if (leadsData.success && plansData.success && faqData.success) {
        const leads = leadsData.data || []
        setStats({
          totalLeads: leads.length,
          activeLeads: leads.filter((l: any) => l.status === 'new').length,
          convertedLeads: leads.filter((l: any) => l.status === 'converted').length,
          totalPlans: plansData.data?.length || 0,
          totalFAQ: faqData.data?.length || 0,
        })
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Erro no logout:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Painel Admin - Ondeline</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={16} /> Sair
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total de Leads</span>
            </div>
            <div className="text-3xl font-bold">{stats.totalLeads}</div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-secondary/50 transition">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-secondary" />
              <span className="text-sm text-muted-foreground">Leads Novos</span>
            </div>
            <div className="text-3xl font-bold text-secondary">{stats.activeLeads}</div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-accent/50 transition">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Planos Ativos</span>
            </div>
            <div className="text-3xl font-bold text-accent">{stats.totalPlans}</div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition">
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">FAQ</span>
            </div>
            <div className="text-3xl font-bold">{stats.totalFAQ}</div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="/admin/analytics"
            className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition group"
          >
            <BarChart3 className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-sm text-muted-foreground">Ver estatísticas e métricas</p>
          </a>

          <a
            href="/admin/leads"
            className="p-6 rounded-xl border border-border bg-card/50 hover:border-secondary/50 transition group"
          >
            <Users className="w-8 h-8 text-secondary mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Leads</h3>
            <p className="text-sm text-muted-foreground">Gerenciar pré-cadastros</p>
          </a>

          <a
            href="/admin/plans"
            className="p-6 rounded-xl border border-border bg-card/50 hover:border-accent/50 transition group"
          >
            <Package className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Planos</h3>
            <p className="text-sm text-muted-foreground">Editar planos de internet</p>
          </a>

          <a
            href="/admin/blog"
            className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition group"
          >
            <BookOpen className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Blog</h3>
            <p className="text-sm text-muted-foreground">Criar e gerenciar posts</p>
          </a>

          <a
            href="/admin/faq"
            className="p-6 rounded-xl border border-border bg-card/50 hover:border-secondary/50 transition group"
          >
            <HelpCircle className="w-8 h-8 text-secondary mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">FAQ</h3>
            <p className="text-sm text-muted-foreground">Perguntas frequentes</p>
          </a>

          <a
            href="/admin/features"
            className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition group"
          >
            <Sparkles className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Features</h3>
            <p className="text-sm text-muted-foreground">Gerenciar funcionalidades</p>
          </a>

          <a
            href="/admin/clients"
            className="p-6 rounded-xl border border-border bg-card/50 hover:border-accent/50 transition group"
          >
            <Building2 className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Clientes</h3>
            <p className="text-sm text-muted-foreground">Parceiros e clientes</p>
          </a>

          <a
            href="/admin/coverage"
            className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition group"
          >
            <MapPin className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Cobertura</h3>
            <p className="text-sm text-muted-foreground">Áreas de cobertura</p>
          </a>

          <a
            href="/admin/materials"
            className="p-6 rounded-xl border border-border bg-card/50 hover:border-secondary/50 transition group"
          >
            <FileText className="w-8 h-8 text-secondary mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Materiais</h3>
            <p className="text-sm text-muted-foreground">Gerenciar downloads</p>
          </a>

          <a
            href="/admin/pages"
            className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition group"
          >
            <Edit className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Páginas</h3>
            <p className="text-sm text-muted-foreground">Editar qualquer página do site</p>
          </a>

          <a
            href="/admin/settings"
            className="p-6 rounded-xl border border-border bg-card/50 hover:border-accent/50 transition group"
          >
            <Settings className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold mb-2">Configurações</h3>
            <p className="text-sm text-muted-foreground">Configurar o site</p>
          </a>
        </div>
      </main>
    </div>
  )
}