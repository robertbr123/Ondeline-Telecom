"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { AnatelSeal } from "./anatel-seal"
import { LogoOndeline } from "./logo-ondeline"
import { useSiteConfig } from "@/lib/site-config-context"

export function Footer() {
  const { config } = useSiteConfig()

  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 py-16 px-4 relative">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div>
            <a href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <LogoOndeline size={36} />
              <h3 className="font-bold text-lg text-cyan-400">Ondeline</h3>
            </a>
            <p className="text-sm text-slate-400">
              Conectando o Amazonas com internet rápida e confiável.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">Sobre</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="/#sobre" className="hover:text-cyan-400 transition">Quem Somos</a>
              </li>
              <li>
                <a href="#planos" className="hover:text-cyan-400 transition">Planos</a>
              </li>
              <li>
                <a href="/empresas" className="hover:text-cyan-400 transition">Empresas</a>
              </li>
              <li>
                <a href="/coverage" className="hover:text-cyan-400 transition">Cobertura</a>
              </li>
              <li>
                <a href="/trabalhe-conosco" className="hover:text-cyan-400 transition">Trabalhe Conosco</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">Suporte</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition">Dúvidas</a>
              </li>
              <li>
                <a href="#suporte" className="hover:text-cyan-400 transition">Problemas</a>
              </li>
              <li>
                <a href="#suporte" className="hover:text-cyan-400 transition">Contato</a>
              </li>
              <li>
                <a href="/status" className="hover:text-cyan-400 transition">Status do Sistema</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white text-sm uppercase tracking-wider">Contato</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-cyan-500" />{" "}
                {config.contactPhone || "(92) 98460-7721"}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-cyan-500" />{" "}
                {config.contactEmail || "contato@ondeline.com.br"}
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-cyan-500" />{" "}
                {config.address || "Ipixuna/AM - Brasil"}
              </li>
            </ul>
          </div>

          <div className="flex justify-center md:justify-start">
            <AnatelSeal />
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} Ondeline. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/privacidade" className="hover:text-cyan-400 transition">Privacidade</a>
              <a href="/termos" className="hover:text-cyan-400 transition">Termos</a>
              <a href="/privacidade#cookies" className="hover:text-cyan-400 transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
