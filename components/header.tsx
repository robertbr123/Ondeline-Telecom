"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">O</span>
          </div>
          <span className="text-xl font-bold text-primary">Ondeline</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#planos" className="text-foreground hover:text-primary transition">
            Planos
          </a>
          <a href="#suporte" className="text-foreground hover:text-primary transition">
            Suporte
          </a>
          <a href="#cobertura" className="text-foreground hover:text-primary transition">
            Cobertura
          </a>
          <Button className="bg-primary hover:bg-primary/90">Contratar</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-4">
            <a href="#planos" className="block text-foreground hover:text-primary">
              Planos
            </a>
            <a href="#suporte" className="block text-foreground hover:text-primary">
              Suporte
            </a>
            <a href="#cobertura" className="block text-foreground hover:text-primary">
              Cobertura
            </a>
            <Button className="w-full bg-primary hover:bg-primary/90">Contratar</Button>
          </div>
        </nav>
      )}
    </header>
  )
}
