"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Icon } from "./Icon"
import { Topbar } from "./Topbar"
import { Nav } from "./Nav"
import { Planos } from "./Planos"
import { Footer } from "./Footer"

export interface CityData {
  slug: string
  name: string
  state: string
  status: "active" | "soon"
  intro: string
  highlights: string[]
  stats: { v: string; k: string }[]
  bairros?: { name: string; soon?: boolean }[]
  photo?: string
  loja: {
    desc: string
    items: { icon: string; k: string; v: string }[]
  }
}

function CityHero({ city, wa }: { city: CityData; wa: string }) {
  const isActive = city.status === "active"
  return (
    <section className="on2-page-hero">
      <div className="on2-shell">
        <div className="crumbs">
          <a href="/">Início</a>
          <span className="sep">/</span>
          <a href="/#cobertura">Cobertura</a>
          <span className="sep">/</span>
          <span>{city.name}</span>
        </div>
        <div className="on2-city-hero-grid">
          <div>
            <span className="on2-sec-lbl">{isActive ? "Rede ativa" : "Em implantação"}</span>
            <h1 style={{ marginTop: 16 }}>Ondeline em <span>{city.name}</span></h1>
            <p className="lead">{city.intro}</p>
            <div className="on2-pill-row">
              {city.highlights.map((h, i) => (
                <span className="pill" key={i}><Icon name="check" size={16} /> {h}</span>
              ))}
            </div>
            <div className="on2-hero-actions" style={{ marginTop: 32 }}>
              {isActive ? (
                <>
                  <a href="#planos" className="on2-btn on2-btn-primary">
                    Ver planos em {city.name} <Icon name="arrow" size={18} />
                  </a>
                  <a href="#contato" className="on2-btn on2-btn-ghost">Quero instalar</a>
                </>
              ) : (
                <a
                  href={`https://wa.me/${wa}?text=Olá! Gostaria de entrar na lista de espera para ${city.name}`}
                  target="_blank" rel="noopener noreferrer"
                  className="on2-btn on2-btn-accent"
                >
                  Entrar na lista de espera <Icon name="arrow" size={18} />
                </a>
              )}
            </div>
          </div>

          <div className="on2-city-photo">
            {city.photo ? (
              <Image src={city.photo} alt={`Foto de ${city.name}`} fill className="object-cover" />
            ) : (
              <div className="on2-city-photo-placeholder">
                FOTO DA CIDADE<br />{city.name.toUpperCase()}
              </div>
            )}
            <div className="on2-city-tag-floating">
              <span className={"ld " + city.status} />
              {isActive ? "Rede operando" : "Em breve"}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CityStats({ city }: { city: CityData }) {
  return (
    <section style={{ padding: "40px 0" }}>
      <div className="on2-shell">
        <div className="on2-city-stats">
          {city.stats.map((s, i) => (
            <div className="cell" key={i}>
              <div className="v">{s.v}</div>
              <div className="k">{s.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CityBairros({ city }: { city: CityData }) {
  if (!city.bairros?.length) return null
  return (
    <section className="on2-sec alt">
      <div className="on2-shell">
        <div className="on2-sec-head">
          <span className="on2-sec-lbl">Cobertura detalhada</span>
          <h2>Bairros atendidos em <span>{city.name}</span></h2>
          <p>Sua rua está na nossa rede? Confira abaixo — e se não estiver, mande seu endereço pelo WhatsApp que confirmamos em minutos.</p>
        </div>
        <div className="on2-bairros">
          {city.bairros!.map((b, i) => (
            <div className={"on2-bairro " + (b.soon ? "soon" : "")} key={i}>
              <span className="dotg" />
              {b.name}
              {b.soon && (
                <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#ff6b4a" }}>
                  Em breve
                </span>
              )}
            </div>
          ))}
        </div>
        <p style={{ marginTop: 24, fontSize: 13, color: "#7a8ba0", fontWeight: 500 }}>
          Não encontrou seu bairro?{" "}
          <a href="https://wa.me/5592984607721" target="_blank" rel="noopener noreferrer" style={{ color: "#0fb8b3", fontWeight: 700 }}>
            Mande seu endereço pelo WhatsApp
          </a>{" "}
          que confirmamos em minutos.
        </p>
      </div>
    </section>
  )
}

function CityLoja({ city }: { city: CityData }) {
  return (
    <section className="on2-sec alt">
      <div className="on2-shell">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="on2-sec-lbl">Atendimento local</span>
            <h2 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.05, marginTop: 16, marginBottom: 18, color: "#0a2540" }}>
              A gente está <span style={{ color: "#0fb8b3" }}>aqui, em {city.name}</span>.
            </h2>
            <p style={{ fontSize: 17, color: "#3d5672", lineHeight: 1.55, marginBottom: 28, maxWidth: "50ch" }}>
              {city.loja.desc}
            </p>
            {city.loja.items.map((it, i) => (
              <div className="on2-loja-item" key={i}>
                <div className="on2-loja-icon"><Icon name={it.icon} size={20} /></div>
                <div>
                  <div className="lbl">{it.k}</div>
                  <div className="val">{it.v}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="on2-city-photo" style={{ aspectRatio: "4/3" }}>
            <div className="on2-city-photo-placeholder">EQUIPE LOCAL<br />{city.name.toUpperCase()}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CityCTAActive({ city, wa, phone }: { city: CityData; wa: string; phone: string }) {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState("")
  const [tel, setTel] = useState("")
  const [address, setAddress] = useState("")
  const [plan, setPlan] = useState("Fluxo · 600 Mega")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: tel, city: city.name, planInterest: plan, email: "", status: "new", notes: `Endereço: ${address}` }),
      })
    } catch {}
    setSent(true)
  }

  return (
    <section className="on2-cta-section" id="contato">
      <div className="on2-shell">
        <div className="on2-cta-card">
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="on2-sec-lbl" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
              Instalação em {city.name}
            </span>
            <h2 style={{ marginTop: 16 }}>Fibra na sua casa em {city.name}, em até 48h.</h2>
            <p>Deixa seus dados que nosso time entra em contato em menos de 1 hora útil com toda a disponibilidade pro seu endereço.</p>
            <div className="on2-cta-contacts">
              <div className="on2-cta-contact">
                <Icon name="wa" size={22} />
                <div>
                  <div className="lbl">WHATSAPP</div>
                  <div className="val">{phone}</div>
                </div>
              </div>
            </div>
          </div>
          <form className="on2-cta-form" onSubmit={handleSubmit}>
            {!sent ? (
              <>
                <h3>Solicitar instalação</h3>
                <label>Nome completo</label>
                <input required placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
                <label>WhatsApp</label>
                <input required placeholder="(92) 98460-7721" value={tel} onChange={(e) => setTel(e.target.value)} />
                <label>Endereço / bairro em {city.name}</label>
                <input required placeholder="Rua, bairro ou referência" value={address} onChange={(e) => setAddress(e.target.value)} />
                <label>Plano de interesse</label>
                <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                  <option>Essencial · 300 Mega</option>
                  <option>Fluxo · 600 Mega</option>
                  <option>Correnteza · 1 Giga</option>
                  <option>Ainda não sei</option>
                </select>
                <button className="on2-btn on2-btn-primary" type="submit" style={{ width: "100%", justifyContent: "center", marginTop: 20 }}>
                  Quero instalar <Icon name="arrow" size={18} />
                </button>
              </>
            ) : (
              <div className="on2-cta-thanks">
                <div className="check">✓</div>
                <h4>Pedido recebido!</h4>
                <p>Nossa equipe entra em contato em até 1 hora útil.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function CityCTASoon({ city, wa }: { city: CityData; wa: string }) {
  const [sent, setSent] = useState(false)
  const [tel, setTel] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="on2-sec" id="contato">
      <div className="on2-shell">
        <div className="on2-soon-banner">
          {!sent ? (
            <>
              <h2>A Ondeline está chegando em <span>{city.name}</span>.</h2>
              <p>Cadastre seu WhatsApp para ser um dos primeiros assinantes quando a rede chegar. Vaga garantida sem compromisso.</p>
              <form className="on2-soon-form" onSubmit={handleSubmit}>
                <input
                  required
                  placeholder="Seu WhatsApp (92) 9 8460-7721"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                />
                <button className="on2-btn on2-btn-primary" type="submit">
                  Quero ser avisado <Icon name="arrow" size={18} />
                </button>
              </form>
            </>
          ) : (
            <div className="on2-soon-thanks">
              <div className="check">✓</div>
              <h4 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Você está na lista!</h4>
              <p style={{ color: "#c7d4e0", fontSize: 16 }}>
                Vamos avisar assim que a Ondeline chegar em {city.name}.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function CityPage({ city, whatsapp, phone, logo }: { city: CityData; whatsapp?: string; phone?: string; logo?: string }) {
  const wa = whatsapp || "5592984607721"
  const ph = phone || "(92) 98460-7721"

  return (
    <div className="on2">
      <Topbar phone={ph} />
      <Nav whatsapp={wa} logo={logo} />
      <CityHero city={city} wa={wa} />
      <CityStats city={city} />
      {city.bairros && <CityBairros city={city} />}
      {city.status === "active" && <Planos whatsapp={wa} />}
      <CityLoja city={city} />
      {city.status === "active" ? (
        <CityCTAActive city={city} wa={wa} phone={ph} />
      ) : (
        <CityCTASoon city={city} wa={wa} />
      )}
      <Footer whatsapp={wa} phone={ph} logo={logo} />
    </div>
  )
}
