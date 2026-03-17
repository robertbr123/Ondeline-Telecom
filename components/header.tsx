"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { LogoOndeline } from "./logo-ondeline"
import { ThemeToggle } from "./theme-toggle"
import { useSiteConfig } from "@/lib/site-config-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { config } = useSiteConfig()
  const whatsappNumber = config.whatsappNumber || "5592984607721"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "dark:bg-slate-950/90 bg-white/90 backdrop-blur-xl border-b dark:border-slate-800/50 border-slate-200/50 shadow-lg dark:shadow-black/10 shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <LogoOndeline size={48} />
          <span className="text-xl font-bold text-cyan-400">Ondeline</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition text-sm font-medium">
            Inicio
          </a>
          <a href="#planos" className="dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition text-sm font-medium">
            Planos
          </a>
          <a href="/empresas" className="dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition text-sm font-medium">
            Empresas
          </a>
          <a href="#suporte" className="dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition text-sm font-medium">
            Suporte
          </a>
          <a href="/blog" className="dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition text-sm font-medium">
            Blog
          </a>
          <a href="/coverage" className="dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition text-sm font-medium">
            Cobertura
          </a>

          <ThemeToggle />

          <a
            href="https://ondeline.sgp.tsmx.com.br/accounts/central/login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition text-sm font-medium"
          >
            <div className="relative">
              <User size={18} />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inset-0 rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <span>Area do Cliente</span>
          </a>

          <a
            href={`https://wa.me/${whatsappNumber}?text=Olá! Gostaria de contratar os serviços da Ondeline`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 shadow-lg shadow-cyan-500/20 text-sm">
              Contratar Agora
            </Button>
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md dark:text-slate-300 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden border-t dark:border-slate-800 border-slate-200 dark:bg-slate-950/95 bg-white/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-4">
            <a href="/" onClick={() => setIsOpen(false)} className="block dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition">
              Inicio
            </a>
            <a href="#planos" onClick={() => setIsOpen(false)} className="block dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition">
              Planos
            </a>
            <a href="/empresas" onClick={() => setIsOpen(false)} className="block dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition">
              Empresas
            </a>
            <a href="#suporte" onClick={() => setIsOpen(false)} className="block dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition">
              Suporte
            </a>
            <a href="/blog" onClick={() => setIsOpen(false)} className="block dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition">
              Blog
            </a>
            <a href="/coverage" onClick={() => setIsOpen(false)} className="block dark:text-slate-300 text-slate-600 hover:text-cyan-400 transition">
              Cobertura
            </a>
            <a
              href="https://ondeline.sgp.tsmx.com.br/accounts/central/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition"
            >
              <div className="relative">
                <User size={20} />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inset-0 rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </div>
              <span>Area do Cliente</span>
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Olá! Gostaria de contratar os serviços da Ondeline`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0">
                Contratar Agora
              </Button>
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
