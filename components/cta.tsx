"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useSiteConfig } from "@/lib/site-config-context"

export function CTA() {
  const { config } = useSiteConfig()
  const whatsappNumber = config.whatsappNumber || "5592984607721"
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá%20Ondeline,%20gostaria%20de%20contratar%20um%20plano%20de%20internet`

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
          Pronto para a Melhor Internet do Amazonas?
        </h2>
        <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
          Junte-se a centenas de clientes satisfeitos que já aproveitam a conexão rápida e confiável da Ondeline.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            size="lg"
            asChild
            className="bg-background hover:bg-background/90 text-foreground h-12 px-8 text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Contratar Agora <MessageCircle size={20} />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto bg-transparent"
          >
            Fale com a Gente
          </Button>
        </div>
      </div>
    </section>
  )
}
