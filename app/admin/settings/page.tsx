"use client"

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Upload, ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'

interface SiteConfig {
  title: string
  description: string
  contactPhone: string
  contactEmail: string
  whatsappNumber: string
  address: string
  facebook: string
  instagram: string
  twitter: string
  linkedin: string
  keywords: string[]
  logoUrl: string
  // SEO
  googleAnalyticsId: string
  googleTagManagerId: string
  facebookPixelId: string
  metaRobots: string
  canonicalUrl: string
  ogImage: string
}

export default function AdminSettings() {
  const [config, setConfig] = useState<SiteConfig>({
    title: '',
    description: '',
    contactPhone: '',
    contactEmail: '',
    whatsappNumber: '',
    address: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    keywords: [],
    logoUrl: '/logo-ondeline.png',
    // SEO
    googleAnalyticsId: '',
    googleTagManagerId: '',
    facebookPixelId: '',
    metaRobots: 'index, follow',
    canonicalUrl: '',
    ogImage: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/site/config')
      const data = await res.json()
      if (data.success) {
        setConfig({
          ...config,
          ...data.data,
          logoUrl: data.data.logoUrl || '/logo-ondeline.png',
        })
      }
    } catch (error) {
      console.error('Erro ao buscar configurações:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload/logo', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (data.success) {
        setConfig({ ...config, logoUrl: data.data.url })
        toast.success('Logo atualizado! Salve para aplicar as alterações.')
      } else {
        toast.error(data.error || 'Erro ao fazer upload do logo')
      }
    } catch (error) {
      toast.error('Erro ao fazer upload do logo')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    
    try {
      const res = await fetch('/api/site/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })

      const data = await res.json()
      if (data.success) {
        toast.success('Configurações salvas com sucesso!')
      } else {
        toast.error('Erro ao salvar configurações')
      }
    } catch (error) {
      toast.error('Erro ao salvar configurações')
    } finally {
      setSaving(false)
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
          <h1 className="text-2xl font-bold mt-4">Configurações do Site</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-card/50 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Logo do Site</h2>
              
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden">
                  {config.logoUrl ? (
                    <Image
                      src={config.logoUrl}
                      alt="Logo atual"
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex-1 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Faça upload do logo da empresa. Recomendado: PNG ou SVG com fundo transparente.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2"
                  >
                    <Upload size={16} />
                    {uploading ? 'Enviando...' : 'Alterar Logo'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card/50 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Informações Básicas</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Título do Site</label>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => setConfig({ ...config, title: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descrição</label>
                <textarea
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Endereço</label>
                <input
                  type="text"
                  value={config.address}
                  onChange={(e) => setConfig({ ...config, address: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Palavras-chave (separadas por vírgula)</label>
                <input
                  type="text"
                  value={config.keywords.join(', ')}
                  onChange={(e) => setConfig({ 
                    ...config, 
                    keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                  })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card/50 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Contato</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone de Contato</label>
                  <input
                    type="text"
                    value={config.contactPhone}
                    onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email de Contato</label>
                  <input
                    type="email"
                    value={config.contactEmail}
                    onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Número WhatsApp</label>
                <input
                  type="text"
                  value={config.whatsappNumber}
                  onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  placeholder="5592984607721"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card/50 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Redes Sociais</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Facebook</label>
                  <input
                    type="url"
                    value={config.facebook}
                    onChange={(e) => setConfig({ ...config, facebook: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram</label>
                  <input
                    type="url"
                    value={config.instagram}
                    onChange={(e) => setConfig({ ...config, instagram: e.target.value })}
                    className="w-full px-3 py-2 bg-input border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Twitter</label>
                  <input
                    type="url"
                    value={config.twitter}
                    onChange={(e) => setConfig({ ...config, twitter: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={config.linkedin}
                    onChange={(e) => setConfig({ ...config, linkedin: e.target.value })}
                    className="w-full px-3 py-2 bg-input border-border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card/50 space-y-4">
              <h2 className="text-lg font-semibold mb-4">SEO e Analytics</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Configure as ferramentas de análise e otimização para mecanismos de busca.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
                  <input
                    type="text"
                    value={config.googleAnalyticsId}
                    onChange={(e) => setConfig({ ...config, googleAnalyticsId: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="G-XXXXXXXXXX ou UA-XXXXXXXXX-X"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Ex: G-XXXXXXXXXX (GA4) ou UA-XXXXXXXXX-X (Universal)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Google Tag Manager ID</label>
                  <input
                    type="text"
                    value={config.googleTagManagerId}
                    onChange={(e) => setConfig({ ...config, googleTagManagerId: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="GTM-XXXXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Facebook Pixel ID</label>
                  <input
                    type="text"
                    value={config.facebookPixelId}
                    onChange={(e) => setConfig({ ...config, facebookPixelId: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                    placeholder="XXXXXXXXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Meta Robots</label>
                  <select
                    value={config.metaRobots}
                    onChange={(e) => setConfig({ ...config, metaRobots: e.target.value })}
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  >
                    <option value="index, follow">index, follow (Recomendado)</option>
                    <option value="index, nofollow">index, nofollow</option>
                    <option value="noindex, follow">noindex, follow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">URL Canônica</label>
                <input
                  type="url"
                  value={config.canonicalUrl}
                  onChange={(e) => setConfig({ ...config, canonicalUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  placeholder="https://www.ondeline.com.br"
                />
                <p className="text-xs text-muted-foreground mt-1">URL principal do site para evitar conteúdo duplicado</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Imagem Open Graph (compartilhamento)</label>
                <input
                  type="url"
                  value={config.ogImage}
                  onChange={(e) => setConfig({ ...config, ogImage: e.target.value })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg"
                  placeholder="https://www.ondeline.com.br/og-image.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">Imagem exibida ao compartilhar o site em redes sociais (1200x630px recomendado)</p>
              </div>
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full md:w-auto flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              <Save size={16} /> {saving ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
