"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { LogoOndeline } from "./logo-ondeline"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoOndeline size={48} />
          <span className="text-xl font-bold text-primary">Ondeline</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-foreground hover:text-primary transition">
            Início
          </a>
          <a href="#planos" className="text-foreground hover:text-primary transition">
            Planos
          </a>
          <a href="#suporte" className="text-foreground hover:text-primary transition">
            Suporte
          </a>
          <a href="/blog" className="text-foreground hover:text-primary transition">
            Blog
          </a>
          <a href="/coverage" className="text-foreground hover:text-primary transition">
            Cobertura
          </a>

          <ThemeToggle />

          <a
            href={`https://wa.me/5592984607721?text=Olá! Gostaria de contratar os serviços da Ondeline`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-primary hover:bg-primary/90">Contratar Agora</Button>
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-4">
            <a href="/" className="block text-foreground hover:text-primary">
              Início
            </a>
            <a href="#planos" className="block text-foreground hover:text-primary">
              Planos
            </a>
            <a href="#suporte" className="block text-foreground hover:text-primary">
              Suporte
            </a>
            <a href="/blog" className="block text-foreground hover:text-primary">
              Blog
            </a>
            <a href="/coverage" className="block text-foreground hover:text-primary">
              Cobertura
            </a>
            <a
              href={`https://wa.me/5592984607721?text=Olá! Gostaria de contratar os serviços da Ondeline`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-primary hover:bg-primary/90">Contratar Agora</Button>
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
