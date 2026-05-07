"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { LogoImg } from "@/components/on2/LogoImg"
import { Icon } from "@/components/on2/Icon"

const WA = "5592984607721"

interface CoverageArea {
  id: number
  name: string
  state: string
  status: string
  description: string
  population: number
  launch_date: string
}

const CITY_LINKS: Record<string, string> = {
  Ipixuna: "/ipixuna",
  Eirunepé: "/eirunepe",
  Itamarati: "/itamarati",
  Carauari: "/carauari",
}

function formatPop(n: number) {
  return n?.toLocaleString("pt-BR")
}

export default function CoveragePage() {
  const [areas, setAreas] = useState<CoverageArea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/coverage")
      .then((r) => r.json())
      .then((d) => { setAreas(d.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const active = areas.filter((a) => a.status === "active")
  const soon = areas.filter((a) => a.status === "coming_soon")

  return (
    <div className="on2">
      {/* Nav */}
      <nav className="on2-nav" style={{ position: "relative" }}>
        <div className="on2-shell on2-nav-inner">
          <Link href="/" className="on2-nav-logo">
            <LogoImg height={36} />
          </Link>
          <div className="on2-nav-links" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Link href="/#planos" className="on2-nav-link">Planos</Link>
            <Link href={`https://wa.me/${WA}`} className="on2-nav-cta">Assine agora</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0fb8b3 0%, #0a8a86 100%)", padding: "72px 0 56px" }}>
        <div className="on2-shell" style={{ textAlign: "center" }}>
          <span className="on2-sec-lbl" style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)" }}>Cobertura Regional</span>
          <h1 style={{ fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 800, color: "#fff", marginTop: 16, marginBottom: 16 }}>
            Onde a Ondeline está presente
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", maxWidth: 580, margin: "0 auto" }}>
            Levando fibra óptica de verdade para as comunidades do Vale do Juruá, no coração do Amazonas.
          </p>
        </div>
      </section>

      {/* Cidades ativas */}
      <section className="on2-sec">
        <div className="on2-shell">
          <div className="on2-sec-head center">
            <span className="on2-sec-lbl" style={{ color: "#0fb8b3", borderColor: "#b2f0ee", background: "#e6fafa" }}>Disponível agora</span>
            <h2 style={{ marginTop: 14 }}>Cidades com <span>cobertura ativa</span></h2>
            <p>Nestas cidades você já pode contratar a fibra Ondeline.</p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ width: 36, height: 36, border: "3px solid #0fb8b3", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto", animation: "spin 0.8s linear infinite" }} />
              <p style={{ marginTop: 16, color: "#6b7280" }}>Carregando...</p>
            </div>
          ) : active.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6b7280", padding: "48px 0" }}>Nenhuma cidade ativa cadastrada.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {active.map((area) => {
                const cityPath = CITY_LINKS[area.name]
                return (
                  <div key={area.id} className="on2-why-card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111827", display: "flex", alignItems: "center", gap: 6 }}>
                          <Icon name="pin" size={18} /> {area.name}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>{area.state}</div>
                      </div>
                      <span style={{ background: "#e6fafa", color: "#0a8a86", fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>Ativo</span>
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "#4b5563", margin: 0 }}>
                      {area.description || "Fibra óptica dedicada com suporte local."}
                    </p>
                    {area.population > 0 && (
                      <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                        {formatPop(area.population)} habitantes
                      </div>
                    )}
                    <div style={{ display: "flex", gap: 8, marginTop: "auto", flexWrap: "wrap" }}>
                      {cityPath && (
                        <Link href={cityPath} className="on2-btn on2-btn-ghost" style={{ flex: 1, textAlign: "center", justifyContent: "center" }}>
                          Ver cidade
                        </Link>
                      )}
                      <a
                        href={`https://wa.me/${WA}?text=Olá! Quero contratar internet em ${area.name}`}
                        target="_blank" rel="noopener noreferrer"
                        className="on2-btn on2-btn-primary" style={{ flex: 1, textAlign: "center", justifyContent: "center" }}
                      >
                        Contratar <Icon name="arrow" size={16} />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Em breve */}
      {(!loading && soon.length > 0) && (
        <section className="on2-sec" style={{ background: "#f4f6f8" }}>
          <div className="on2-shell">
            <div className="on2-sec-head center">
              <span className="on2-sec-lbl" style={{ color: "#b45309", borderColor: "#fde68a", background: "#fefce8" }}>Em breve</span>
              <h2 style={{ marginTop: 14 }}>Próximas <span>cidades</span></h2>
              <p>Estamos expandindo! Essas cidades receberão cobertura em breve.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {soon.map((area) => (
                <div key={area.id} className="on2-why-card" style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>📍</div>
                  <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "#111827" }}>{area.name}</div>
                  <div style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: 8 }}>{area.state}</div>
                  {area.launch_date && (
                    <span style={{ background: "#fefce8", color: "#b45309", fontSize: "0.75rem", fontWeight: 600, padding: "3px 10px", borderRadius: 99 }}>
                      Previsão: {new Date(area.launch_date).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="on2-cta-sec">
        <div className="on2-shell" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 800, marginBottom: 16 }}>
            Sua cidade não está na lista?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: 520, margin: "0 auto 32px" }}>
            Entre em contato — estamos sempre expandindo para levar fibra óptica a mais comunidades do Amazonas.
          </p>
          <a
            href={`https://wa.me/${WA}?text=Olá! Gostaria de saber quando a Ondeline chegará na minha cidade`}
            target="_blank" rel="noopener noreferrer"
            className="on2-btn" style={{ background: "#fff", color: "#0a8a86", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            Falar com a Ondeline <Icon name="arrow" size={18} />
          </a>
        </div>
      </section>

      {/* Footer simples */}
      <footer className="on2-footer">
        <div className="on2-shell on2-footer-inner">
          <div className="on2-footer-logo">
            <LogoImg height={32} filterInvert />
          </div>
          <div className="on2-footer-copy">© 2023–2026 Ondeline Telecom · Vale do Juruá / AM</div>
        </div>
      </footer>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
