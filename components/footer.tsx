"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { AnatelSeal } from "./anatel-seal"
import { LogoOndeline } from "./logo-ondeline"
import { useSiteConfig } from "@/lib/site-config-context"

export function Footer() {
  const { config } = useSiteConfig()
  
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <LogoOndeline size={36} />
              <h3 className="font-bold text-lg text-primary">Ondeline</h3>
            </div>
            <p className="text-sm text-muted-foreground">Conectando o Amazonas com internet rápida e confiável.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">Sobre</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#planos" className="hover:text-primary transition">
                  Planos
                </a>
              </li>
              <li>
                <a href="/coverage" className="hover:text-primary transition">
                  Cobertura
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">Suporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#faq" className="hover:text-primary transition">
                  Dúvidas
                </a>
              </li>
              <li>
                <a href="#suporte" className="hover:text-primary transition">
                  Problemas
                </a>
              </li>
              <li>
                <a href="#suporte" className="hover:text-primary transition">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-primary">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" /> {config.contactPhone || "(92) 98460-7721"}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" /> {config.contactEmail || "contato@ondeline.com.br"}
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" /> {config.address || "Ipixuna/AM - Brasil"}
              </li>
            </ul>
          </div>

          <div className="flex justify-center md:justify-start">
            <AnatelSeal />
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Ondeline. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition">
                Privacidade
              </a>
              <a href="#" className="hover:text-primary transition">
                Termos
              </a>
              <a href="#" className="hover:text-primary transition">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
