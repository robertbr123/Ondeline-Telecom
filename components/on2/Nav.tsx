"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Icon } from "./Icon"

export function Nav({ whatsapp, logo }: { whatsapp?: string; logo?: string }) {
  const [open, setOpen] = useState(false)
  const wa = whatsapp || "5592984607721"
  const logoSrc = logo || "/logo-ondeline.png"

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const close = () => setOpen(false)

  return (
    <nav className="on2-nav">
      <div className="on2-shell on2-nav-inner">
        <a href="/" className="on2-nav-logo">
          <Image src={logoSrc} alt="Ondeline" width={140} height={40} style={{ height: 40, width: "auto" }} />
        </a>

        <div className="on2-nav-links">
          <a href="/#planos">Planos</a>
          <a href="/coverage">Cobertura</a>
          <a href="/#porque">Por que Ondeline</a>
          <a href="/empresas">Empresarial</a>
          <a href="/#contato">Contato</a>
        </div>

        <a className="on2-nav-cta" href={`https://wa.me/${wa}?text=Olá! Gostaria de assinar a Ondeline`} target="_blank" rel="noopener noreferrer">
          Assine agora <Icon name="arrow" size={18} />
        </a>

        <button
          className={"on2-burger " + (open ? "open" : "")}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          type="button"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={"on2-mobile-menu " + (open ? "open" : "")} onClick={close}>
        <div className="on2-mobile-menu-inner" onClick={(e) => e.stopPropagation()}>
          <a href="/#planos" onClick={close}>Planos residenciais</a>
          <a href="/empresas" onClick={close}>Empresarial</a>
          <a href="/coverage" onClick={close}>Cobertura</a>
          <a href="/#porque" onClick={close}>Por que Ondeline</a>
          <a href="/#contato" onClick={close}>Contato</a>
          <div className="on2-mm-cities">
            <div className="lbl">Cidades</div>
            <a href="/ipixuna" onClick={close}>Ipixuna</a>
            <a href="/eirunepe" onClick={close}>Eirunepé</a>
            <a href="/itamarati" onClick={close}>Itamarati</a>
            <a href="/carauari" onClick={close}>Carauari</a>
          </div>
          <a
            className="on2-nav-cta on2-mm-cta"
            href={`https://wa.me/${wa}?text=Olá! Gostaria de assinar a Ondeline`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            Assine agora <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </nav>
  )
}
