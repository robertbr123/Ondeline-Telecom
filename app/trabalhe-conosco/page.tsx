"use client"

import { useState } from "react"
import Link from "next/link"
import { LogoImg } from "@/components/on2/LogoImg"
import { Icon } from "@/components/on2/Icon"

const WA = "5592984607721"

const BENEFITS = [
  "Salário competitivo compatível com o mercado",
  "Vale-alimentação e vale-transporte",
  "Plano de saúde e odontológico",
  "PLR — Participação nos Lucros",
  "Internet gratuita em casa",
  "Cursos e capacitações pagos pela empresa",
]

const CULTURE = [
  "Compromisso com a qualidade",
  "Respeito ao cliente e aos colegas",
  "Inovação contínua",
  "Trabalho em equipe",
  "Ética e transparência",
]

const WHY = [
  { icon: "👥", title: "Equipe Unida", desc: "Ambiente colaborativo e acolhedor no Vale do Juruá" },
  { icon: "📈", title: "Crescimento", desc: "Oportunidades reais de desenvolvimento profissional" },
  { icon: "⚡", title: "Inovação", desc: "Trabalhe com tecnologia de fibra óptica de ponta" },
  { icon: "🌿", title: "Impacto", desc: "Conecte comunidades do Amazonas ao mundo" },
]

export default function TrabalheConoscoPage() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", cidade: "", cargo: "", experiencia: "", mensagem: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSent(true)
    setSending(false)
  }

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
          <span className="on2-sec-lbl" style={{ color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)" }}>Faça parte do time</span>
          <h1 style={{ fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 800, color: "#fff", marginTop: 16, marginBottom: 16 }}>
            Trabalhe Conosco
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto" }}>
            Junte-se à equipe que está conectando o Vale do Juruá. Construa uma carreira em uma empresa em crescimento real.
          </p>
        </div>
      </section>

      {/* Por que trabalhar */}
      <section className="on2-sec">
        <div className="on2-shell">
          <div className="on2-sec-head center">
            <span className="on2-sec-lbl">Por que a Ondeline</span>
            <h2 style={{ marginTop: 14 }}>Uma empresa que <span>cresce com você</span></h2>
          </div>
          <div className="on2-why-grid">
            {WHY.map((w, i) => (
              <div key={i} className="on2-why-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>{w.icon}</div>
                <h3 style={{ fontWeight: 700, color: "#111827", marginBottom: 6 }}>{w.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#4b5563", margin: 0 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário + Info */}
      <section className="on2-sec" style={{ background: "#f4f6f8" }}>
        <div className="on2-shell">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="on2-form-grid">

            {/* Formulário */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 36, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <div style={{ width: 72, height: 72, background: "#e6fafa", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "2rem", color: "#0fb8b3" }}>✓</div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.4rem", color: "#111827", marginBottom: 12 }}>Candidatura enviada!</h3>
                  <p style={{ color: "#4b5563", marginBottom: 24 }}>Obrigado! Recebemos seus dados e entraremos em contato em breve pelo WhatsApp ou e-mail.</p>
                  <button onClick={() => { setSent(false); setForm({ nome: "", email: "", telefone: "", cidade: "", cargo: "", experiencia: "", mensagem: "" }) }} className="on2-btn on2-btn-primary">
                    Enviar nova candidatura
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontWeight: 800, fontSize: "1.4rem", color: "#111827", marginBottom: 24 }}>Envie sua Candidatura</h2>
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Nome completo *</label>
                      <input name="nome" required value={form.nome} onChange={handleChange} placeholder="Seu nome completo" style={inputStyle} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <label style={labelStyle}>E-mail *</label>
                        <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="seu@email.com" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Telefone *</label>
                        <input name="telefone" type="tel" required value={form.telefone} onChange={handleChange} placeholder="(92) 99999-9999" style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Cidade *</label>
                      <select name="cidade" required value={form.cidade} onChange={handleChange} style={inputStyle}>
                        <option value="">Selecione a cidade</option>
                        <option value="ipixuna">Ipixuna</option>
                        <option value="eirunepe">Eirunepé</option>
                        <option value="itamarati">Itamarati</option>
                        <option value="carauari">Carauari</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Cargo de interesse *</label>
                      <select name="cargo" required value={form.cargo} onChange={handleChange} style={inputStyle}>
                        <option value="">Selecione o cargo</option>
                        <option value="tecnico">Técnico de Instalação</option>
                        <option value="suporte">Analista de Suporte</option>
                        <option value="vendas">Vendedor</option>
                        <option value="financeiro">Assistente Financeiro</option>
                        <option value="marketing">Auxiliar de Marketing</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Experiência profissional *</label>
                      <select name="experiencia" required value={form.experiencia} onChange={handleChange} style={inputStyle}>
                        <option value="">Selecione</option>
                        <option value="estagiario">Estagiário</option>
                        <option value="junior">Júnior (1–2 anos)</option>
                        <option value="pleno">Pleno (3–5 anos)</option>
                        <option value="senior">Sênior (5+ anos)</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Conte sobre você *</label>
                      <textarea name="mensagem" required rows={4} value={form.mensagem} onChange={handleChange} placeholder="Sua experiência e por que quer trabalhar na Ondeline..." style={{ ...inputStyle, resize: "none" }} />
                    </div>
                    <button type="submit" disabled={sending} className="on2-btn on2-btn-primary" style={{ marginTop: 4, justifyContent: "center" }}>
                      {sending ? "Enviando..." : <>Enviar candidatura <Icon name="arrow" size={18} /></>}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Lado direito */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontWeight: 700, color: "#111827", marginBottom: 16, fontSize: "1.1rem" }}>Benefícios</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {BENEFITS.map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "#374151", fontSize: "0.9rem" }}>
                      <span style={{ color: "#0fb8b3", fontWeight: 700, marginTop: 1 }}>✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontWeight: 700, color: "#111827", marginBottom: 12, fontSize: "1.1rem" }}>Nossa Cultura</h3>
                <p style={{ color: "#4b5563", fontSize: "0.9rem", marginBottom: 12 }}>
                  Valorizamos pessoas proativas, criativas e comprometidas com a comunidade.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {CULTURE.map((c, i) => (
                    <li key={i} style={{ color: "#374151", fontSize: "0.9rem" }}>• {c}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: "linear-gradient(135deg, #0fb8b3 0%, #0a8a86 100%)", borderRadius: 16, padding: 28 }}>
                <h3 style={{ fontWeight: 700, color: "#fff", marginBottom: 16, fontSize: "1.1rem" }}>Entre em Contato</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "📍 Localização", value: "Ipixuna, Eirunepé, Itamarati e Carauari — AM" },
                    { label: "📞 Telefone", value: "(92) 98460-7721" },
                    { label: "✉️ E-mail", value: "rh@ondeline.com.br" },
                  ].map((it, i) => (
                    <div key={i}>
                      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", fontWeight: 600, marginBottom: 2 }}>{it.label}</div>
                      <div style={{ color: "#fff", fontSize: "0.9rem" }}>{it.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="on2-footer">
        <div className="on2-shell on2-footer-inner">
          <div className="on2-footer-logo">
            <LogoImg height={32} filterInvert />
          </div>
          <div className="on2-footer-copy">© 2023–2026 Ondeline Telecom · Vale do Juruá / AM</div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .on2-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: 6 }
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1.5px solid #e5e9ef", borderRadius: 10, fontSize: "0.95rem", fontFamily: "inherit", outline: "none", background: "#fff", color: "#111827", boxSizing: "border-box" }
