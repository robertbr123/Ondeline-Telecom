"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, Wifi, ArrowRight, Tag } from "lucide-react"
import { LogoOndeline } from "@/components/logo-ondeline"
import { Plans } from "@/components/plans"
import { PreregistrationModal } from "@/components/preregistration-modal"
import { useSiteConfig } from "@/lib/site-config-context"

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
  active: boolean
  starts_at: string
  ends_at: string
}

export default function PromoPage() {
  const params = useParams()
  const router = useRouter()
  const { config } = useSiteConfig()
  const whatsappNumber = config.whatsappNumber || "5592984607721"

  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!params.slug) return

    fetch(`/api/campaigns/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const c = data.data
          // Verificar se campanha está ativa e no período válido
          const now = new Date().toISOString()
          if (!c.active) {
            router.push("/")
            return
          }
          if (c.ends_at && c.ends_at < now) {
            router.push("/")
            return
          }
          setCampaign(c)
        } else {
          router.push("/")
        }
      })
      .catch(() => router.push("/"))
      .finally(() => setLoading(false))
  }, [params.slug, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!campaign) return null

  const whatsappMessage = campaign.cta_whatsapp_message ||
    `Olá! Vi a promoção "${campaign.title}" e gostaria de contratar`

  return (
    <div className="min-h-screen bg-background">
      {/* Header simples */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <LogoOndeline size={36} />
            <span className="text-lg font-bold text-primary">Ondeline</span>
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-primary hover:bg-primary/90">
              {campaign.cta_text || "Contratar Agora"}
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4"
        style={campaign.hero_image ? {
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${campaign.hero_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : undefined}
      >
        <div className="max-w-4xl mx-auto text-center">
          {campaign.coupon_code && (
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-full mb-6 text-sm font-medium">
              <Tag size={16} />
              Use o cupom: <strong className="font-mono">{campaign.coupon_code}</strong>
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            {campaign.title}
          </h1>

          {campaign.subtitle && (
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              {campaign.subtitle}
            </p>
          )}

          {campaign.description && (
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {campaign.description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8"
              onClick={() => setShowModal(true)}
            >
              <Wifi className="mr-2" size={20} />
              Fazer Pré-cadastro
            </Button>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto">
                Falar no WhatsApp <ArrowRight className="ml-2" size={20} />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features da Campanha */}
      {campaign.features && campaign.features.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Por que escolher a Ondeline?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {campaign.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border">
                  <Check className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Planos */}
      <Plans />

      {/* CTA Final */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Não perca essa oportunidade!</h2>
          <p className="text-muted-foreground mb-8">
            {campaign.coupon_code
              ? `Use o cupom ${campaign.coupon_code} e garanta seu desconto exclusivo.`
              : 'Entre em contato agora e garanta o melhor da internet na sua região.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => setShowModal(true)}
            >
              Fazer Pré-cadastro
            </Button>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Falar no WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer simples */}
      <footer className="py-6 px-4 border-t border-border text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Ondeline Telecom. Todos os direitos reservados.</p>
      </footer>

      {/* Modal de pré-cadastro */}
      <PreregistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        defaultCity={campaign.default_city}
        defaultCoupon={campaign.coupon_code}
      />
    </div>
  )
}
