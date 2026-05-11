"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { CalendarDays, CheckCircle2, MapPin, Search, Send, Timer } from "lucide-react"
import { Icon } from "./Icon"

interface CoverageArea {
  id: string
  city?: string
  name?: string
  state: string
  status: "active" | "coming_soon" | "inactive" | string
  description?: string
  launchDate?: string
  launch_date?: string
}

const cityLinks: Record<string, string> = {
  Ipixuna: "/ipixuna",
  "Eirunepé": "/eirunepe",
  Eirunepe: "/eirunepe",
  Itamarati: "/itamarati",
  Carauari: "/carauari",
}

const fallbackAreas: CoverageArea[] = [
  { id: "ipixuna", city: "Ipixuna", state: "AM", status: "active", description: "Fibra óptica ativa para residências e empresas." },
  { id: "eirunepe", city: "Eirunepé", state: "AM", status: "active", description: "Hub regional com planos residenciais e empresariais." },
  { id: "itamarati", city: "Itamarati", state: "AM", status: "active", description: "Rede ativa com suporte local e instalação agendada." },
  { id: "carauari", city: "Carauari", state: "AM", status: "coming_soon", description: "Expansão em andamento. Cadastre seu interesse." },
]

function cityName(area: CoverageArea) {
  return area.city || area.name || "Cidade"
}

function statusLabel(status: string) {
  if (status === "active") return "Ativa"
  if (status === "coming_soon") return "Em breve"
  return "Em análise"
}

export function CoverageExperience({ whatsapp }: { whatsapp?: string }) {
  const [areas, setAreas] = useState<CoverageArea[]>(fallbackAreas)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const wa = whatsapp || "5592984607721"

  useEffect(() => {
    fetch("/api/coverage")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data?.length) setAreas(data.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return areas
    return areas.filter((area) => {
      const haystack = `${cityName(area)} ${area.state} ${area.description || ""}`.toLowerCase()
      return haystack.includes(normalized)
    })
  }, [areas, query])

  const active = areas.filter((area) => area.status === "active").length
  const soon = areas.filter((area) => area.status === "coming_soon").length
  const searchedCity = query.trim() || "minha rua"
  const waMessage = `Olá! Quero verificar cobertura da Ondeline em ${searchedCity}.`

  return (
    <>
      <section className="on2-page-hero on2-coverage-hero">
        <div className="on2-shell on2-page-hero-grid">
          <div>
            <span className="on2-sec-lbl">Cobertura Ondeline</span>
            <h1>Confira se a fibra da Ondeline chega até você.</h1>
            <p>
              Veja cidades atendidas, próximas expansões e fale com o time local para confirmar disponibilidade por bairro, rua ou comunidade.
            </p>
            <div className="on2-page-actions">
              <a href="#consulta" className="on2-btn on2-btn-primary">Consultar cobertura <Icon name="arrow" size={18} /></a>
              <a href={`https://wa.me/${wa}?text=${encodeURIComponent(waMessage)}`} target="_blank" rel="noopener noreferrer" className="on2-btn on2-btn-ghost">
                Chamar no WhatsApp
              </a>
            </div>
          </div>

          <div className="on2-coverage-orbit" aria-hidden="true">
            <div className="hub">AM</div>
            {["Ipixuna", "Eirunepé", "Itamarati", "Carauari"].map((city, index) => (
              <span key={city} style={{ "--i": index } as React.CSSProperties}>{city}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="on2-coverage-search" id="consulta">
        <div className="on2-shell">
          <div className="on2-search-panel">
            <div>
              <span className="on2-sec-lbl">Consulta rápida</span>
              <h2>Digite sua cidade, bairro ou rua</h2>
            </div>
            <div className="on2-search-box">
              <Search size={20} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ex: Eirunepé, Centro, Itamarati..."
              />
              <a href={`https://wa.me/${wa}?text=${encodeURIComponent(waMessage)}`} target="_blank" rel="noopener noreferrer">
                Confirmar
              </a>
            </div>
          </div>

          <div className="on2-coverage-metrics">
            <div><strong>{active}</strong><span>Cidades ativas</span></div>
            <div><strong>{soon}</strong><span>Expansões</span></div>
            <div><strong>24h</strong><span>Suporte local</span></div>
          </div>
        </div>
      </section>

      <section className="on2-sec">
        <div className="on2-shell">
          <div className="on2-sec-head center">
            <span className="on2-sec-lbl">Mapa comercial</span>
            <h2>Cidades e <span>status da rede</span>.</h2>
            <p>Use os cards para acessar a página local ou pedir confirmação do seu endereço.</p>
          </div>

          <div className="on2-coverage-grid">
            {filtered.map((area) => {
              const name = cityName(area)
              const isActive = area.status === "active"
              const launch = area.launchDate || area.launch_date
              const href = cityLinks[name]
              const message = `Olá! Quero ${isActive ? "contratar internet" : "entrar na lista de interesse"} em ${name}. Pode verificar meu endereço?`

              return (
                <article className={`on2-coverage-card ${area.status}`} key={area.id}>
                  <div className="top">
                    <div>
                      <span className="pin"><MapPin size={18} /></span>
                      <h3>{name}</h3>
                      <p>{area.state || "AM"}</p>
                    </div>
                    <strong>{statusLabel(area.status)}</strong>
                  </div>
                  <p className="desc">{area.description || "Fibra óptica dedicada, suporte local e instalação com equipe da região."}</p>
                  <div className="meta">
                    <span><CheckCircle2 size={15} /> {isActive ? "Contratação aberta" : "Captação de interesse"}</span>
                    {launch && <span><CalendarDays size={15} /> {new Date(launch).toLocaleDateString("pt-BR")}</span>}
                  </div>
                  <div className="actions">
                    {href && <Link href={href}>Ver cidade</Link>}
                    <a href={`https://wa.me/${wa}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">
                      WhatsApp <Send size={15} />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>

          {!loading && filtered.length === 0 && (
            <div className="on2-empty-state">
              <Timer size={28} />
              <h3>Ainda não encontramos essa região no cadastro.</h3>
              <p>Chame no WhatsApp e nossa equipe confirma manualmente.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
