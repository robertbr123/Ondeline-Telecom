"use client"

import { useEffect, useState } from "react"
import { Arrow, Close, Menu } from "./icons"

const LINKS = [
  { href: "/#planos", label: "Planos" },
  { href: "/#cobertura", label: "Cobertura" },
  { href: "/#porque", label: "Por que Ondeline" },
  { href: "/empresas", label: "Empresas" },
  { href: "https://ondeline.sgp.tsmx.com.br/accounts/central/login", label: "Área do cliente", external: true },
]

export function Nav({ logo }: { logo: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={"o30-nav" + (scrolled || open ? " scrolled" : "")}>
      <div className="o30-shell o30-nav-inner">
        <a href="/" className="o30-brand" aria-label="Ondeline — início">
          <span className="o30-brand-chip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} alt="" width={30} height={30} />
          </span>
          ondeline
        </a>
        <nav className="o30-links" aria-label="Principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="o30-nav-actions">
          <a href="/#contato" className="o30-btn o30-btn-teal o30-btn-sm o30-nav-cta">
            Assinar agora <Arrow size={16} />
          </a>
          <button
            type="button"
            className="o30-burger"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
      <div className={"o30-mobile" + (open ? " open" : "")}>
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {l.label}
          </a>
        ))}
        <a href="/#contato" className="o30-btn o30-btn-teal" onClick={() => setOpen(false)}>
          Assinar agora <Arrow size={16} />
        </a>
      </div>
    </header>
  )
}
