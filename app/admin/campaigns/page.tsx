"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Trash2, Edit, Copy, Megaphone, Eye, Users } from 'lucide-react'
import Link from 'next/link'

interface Campaign {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  hero_image: string
  cta_text: string
  cta_whatsapp_message: string
  coupon_code: string
  default_city: string
  features: string[]
  active: boolean | number
  views: number
  leads_count: number
  starts_at: string
  ends_at: string
}

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Campaign | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [coupons, setCoupons] = useState<{ code: string }[]>([])

  useEffect(() => {
    fetchCampaigns()
    fetchCoupons()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/campaigns')
      const data = await res.json()
      if (data.success) setCampaigns(data.data || [])
    } catch (error) {
      console.error('Erro ao buscar campanhas:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/coupons')
      const data = await res.json()
      if (data.success) setCoupons(data.data || [])
    } catch {}
  }

  const slugify = (text: string) =>
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleCreateNew = () => {
    setIsCreating(true)
    setEditing({
      id: '',
      slug: '',
      title: '',
      subtitle: '',
      description: '',
      hero_image: '',
      cta_text: 'Contratar Agora',
      cta_whatsapp_message: '',
      coupon_code: '',
      default_city: '',
      features: [],
      active: true,
      views: 0,
      leads_count: 0,
      starts_at: new Date().toISOString().split('T')[0],
      ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    })
  }

  const saveCampaign = async (campaign: Campaign) => {
    try {
      const isNew = isCreating || !campaign.id
      const method = isNew ? 'POST' : 'PUT'
      const url = isNew ? '/api/campaigns' : `/api/campaigns/${campaign.id}`

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: campaign.slug,
          title: campaign.title,
          subtitle: campaign.subtitle,
          description: campaign.description,
          hero_image: campaign.hero_image,
          cta_text: campaign.cta_text,
          cta_whatsapp_message: campaign.cta_whatsapp_message,
          coupon_code: campaign.coupon_code,
          default_city: campaign.default_city,
          features: campaign.features,
          active: campaign.active === true || campaign.active === 1,
          starts_at: campaign.starts_at,
          ends_at: campaign.ends_at,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        alert(`Erro: ${data.error || 'Erro ao salvar campanha'}`)
        return
      }

      fetchCampaigns()
      setEditing(null)
      setIsCreating(false)
      alert('Campanha salva com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar campanha:', error)
      alert('Erro ao salvar campanha.')
    }
  }

  const deleteCampaign = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta campanha?')) return
    try {
      const res = await fetch(`/api/campaigns/${id}`, { method: 'DELETE' })
      if (res.ok) fetchCampaigns()
    } catch (error) {
      console.error('Erro ao deletar campanha:', error)
    }
  }

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/promo/${slug}`
    navigator.clipboard.writeText(url)
    alert(`Link copiado: ${url}`)
  }

  const isActive = (c: Campaign) => c.active === true || c.active === 1

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
            <ArrowLeft size={16} /> Voltar
          </Link>
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-2xl font-bold">Gerenciar Campanhas</h1>
            <Button onClick={handleCreateNew} className="flex items-center gap-2">
              <Plus size={16} /> Nova Campanha
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Carregando...</div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12">
            <Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhuma campanha criada ainda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className={`p-6 rounded-xl border transition-all ${
                  isActive(campaign)
                    ? 'border-primary/50 bg-card/50 hover:border-primary'
                    : 'border-border bg-card/30 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold">{campaign.title}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    isActive(campaign)
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {isActive(campaign) ? 'Ativa' : 'Inativa'}
                  </span>
                </div>

                {campaign.subtitle && (
                  <p className="text-sm text-muted-foreground mb-3">{campaign.subtitle}</p>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Eye size={14} /> {campaign.views || 0}</span>
                  <span className="flex items-center gap-1"><Users size={14} /> {campaign.leads_count || 0}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <code className="text-xs bg-muted px-2 py-1 rounded">/promo/{campaign.slug}</code>
                  <button onClick={() => copyLink(campaign.slug)} className="text-muted-foreground hover:text-foreground">
                    <Copy size={14} />
                  </button>
                </div>

                {campaign.coupon_code && (
                  <div className="mb-4">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono">
                      Cupom: {campaign.coupon_code}
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => { setIsCreating(false); setEditing(campaign) }}
                  >
                    <Edit size={14} className="mr-1" /> Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteCampaign(campaign.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Edição */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border border-border rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {isCreating ? 'Nova Campanha' : 'Editar Campanha'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Título</label>
                  <input
                    type="text"
                    value={editing.title}
                    onChange={(e) => {
                      const title = e.target.value
                      setEditing({
                        ...editing,
                        title,
                        slug: isCreating ? slugify(title) : editing.slug,
                      })
                    }}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="Volta às Aulas 2026"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">/promo/</span>
                    <input
                      type="text"
                      value={editing.slug}
                      onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                      className="flex-1 px-3 py-2 bg-input border border-border rounded-lg"
                      placeholder="volta-aulas"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subtítulo</label>
                  <input
                    type="text"
                    value={editing.subtitle}
                    onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="Promoção especial para estudantes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <textarea
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg h-24"
                    placeholder="Descrição da campanha..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">URL da Imagem Hero</label>
                  <input
                    type="text"
                    value={editing.hero_image}
                    onChange={(e) => setEditing({ ...editing, hero_image: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="https://..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Texto do CTA</label>
                    <input
                      type="text"
                      value={editing.cta_text}
                      onChange={(e) => setEditing({ ...editing, cta_text: e.target.value })}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                      placeholder="Contratar Agora"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Cidade Padrão</label>
                    <select
                      value={editing.default_city}
                      onChange={(e) => setEditing({ ...editing, default_city: e.target.value })}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    >
                      <option value="">Todas</option>
                      <option value="Ipixuna">Ipixuna</option>
                      <option value="Eirunepe">Eirunepe</option>
                      <option value="Itamarati">Itamarati</option>
                      <option value="Carauari">Carauari</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cupom Associado</label>
                  <select
                    value={editing.coupon_code}
                    onChange={(e) => setEditing({ ...editing, coupon_code: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  >
                    <option value="">Nenhum</option>
                    {coupons.map((c) => (
                      <option key={c.code} value={c.code}>{c.code}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem WhatsApp personalizada</label>
                  <input
                    type="text"
                    value={editing.cta_whatsapp_message}
                    onChange={(e) => setEditing({ ...editing, cta_whatsapp_message: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="Olá! Vi a promoção volta às aulas e gostaria de contratar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Features/Benefícios (um por linha)</label>
                  <textarea
                    value={(editing.features || []).join('\n')}
                    onChange={(e) => setEditing({ ...editing, features: e.target.value.split('\n').filter(f => f.trim()) })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg h-32"
                    placeholder="Internet ultra rápida&#10;Instalação gratuita&#10;Sem fidelidade"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Início</label>
                    <input
                      type="date"
                      value={editing.starts_at?.split('T')[0]}
                      onChange={(e) => setEditing({ ...editing, starts_at: e.target.value })}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Fim</label>
                    <input
                      type="date"
                      value={editing.ends_at?.split('T')[0]}
                      onChange={(e) => setEditing({ ...editing, ends_at: e.target.value })}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive(editing)}
                    onChange={(e) => setEditing({ ...editing, active: e.target.checked })}
                  />
                  <span className="text-sm">Ativa</span>
                </label>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => { setEditing(null); setIsCreating(false) }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => saveCampaign(editing)}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
