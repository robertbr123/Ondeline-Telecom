"use client"

import { useState } from "react"
import { Icon } from "./Icon"

export function CTASection({ whatsapp, phone }: { whatsapp?: string; phone?: string }) {
  const [sent, setSent] = useState(false)
  const [city, setCity] = useState("Eirunepé")
  const [name, setName] = useState("")
  const [tel, setTel] = useState("")
  const [plan, setPlan] = useState("Fluxo · 600 Mega")
  const wa = whatsapp || "5592984607721"
  const contactPhone = phone || "(92) 98460-7721"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: tel, city, planInterest: plan, email: "", status: "new" }),
      })
    } catch {}
    setSent(true)
  }

  return (
    <section className="on2-cta-section" id="contato">
      <div className="on2-shell">
        <div className="on2-cta-card">
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="on2-sec-lbl" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>Vamos te conectar</span>
            <h2 style={{ marginTop: 16 }}>Pronto pra entrar na onda certa?</h2>
            <p>Deixa seu WhatsApp e a cidade onde mora. A gente retorna em menos de 1h em horário comercial, com todas as opções pro seu endereço.</p>
            <div className="on2-cta-contacts">
              <div className="on2-cta-contact">
                <Icon name="wa" size={22} />
                <div>
                  <div className="lbl">WHATSAPP</div>
                  <div className="val">{contactPhone}</div>
                </div>
              </div>
              <div className="on2-cta-contact">
                <Icon name="pin" size={22} />
                <div>
                  <div className="lbl">LOJA FÍSICA</div>
                  <div className="val">Eirunepé · AM</div>
                </div>
              </div>
            </div>
          </div>

          <form className="on2-cta-form" onSubmit={handleSubmit}>
            {!sent ? (
              <>
                <h3>Solicite sua instalação</h3>
                <label>Nome completo</label>
                <input required placeholder="Como podemos te chamar?" value={name} onChange={(e) => setName(e.target.value)} />
                <label>WhatsApp</label>
                <input required placeholder="(92) 98460-7721" value={tel} onChange={(e) => setTel(e.target.value)} />
                <label>Cidade</label>
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option>Ipixuna</option>
                  <option>Eirunepé</option>
                  <option>Itamarati</option>
                  <option>Carauari (lista de espera)</option>
                </select>
                <label>Plano de interesse</label>
                <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                  <option>Essencial · 300 Mega</option>
                  <option>Fluxo · 600 Mega</option>
                  <option>Correnteza · 1 Giga</option>
                  <option>Empresarial · consultar</option>
                </select>
                <button className="on2-btn on2-btn-primary" type="submit">
                  Quero assinar <Icon name="arrow" size={18} />
                </button>
              </>
            ) : (
              <div className="on2-cta-thanks">
                <div className="check">✓</div>
                <h4>Pedido recebido!</h4>
                <p>Nossa equipe entra em contato em até 1 hora útil. Obrigado por escolher a Ondeline.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
