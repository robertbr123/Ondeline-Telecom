"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

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
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/site/config')
      const data = await res.json()
      if (data.success) {
        setConfig(data.data)
      }
    } catch (error) {
      console.error('Erro ao buscar configurações:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    
    try {
      const res = await fetch('/api/site/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })

      const data = await res.json()
      if (data.success) {
        setMessage('Configurações salvas com sucesso!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Erro ao salvar configurações')
      }
    } catch (error) {
      setMessage('Erro ao salvar configurações')
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
            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('sucesso')
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                  : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}>
                {message}
              </div>
            )}

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
