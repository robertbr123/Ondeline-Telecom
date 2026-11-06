"use client"

import { useState } from "react"
import { Arrow, Check, Phone } from "./icons"

export function Contact({
  whatsapp,
  phone,
  planNames,
}: {
  whatsapp: string
  phone: string
  planNames: string[]
}) {
  const [name, setName] = useState("")
  const [tel, setTel] = useState("")
  const [city, setCity] = useState("Eirunepé")
  const [plan, setPlan] = useState(planNames[0] || "")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: tel, city, planInterest: plan, email: "", status: "new" }),
      })
    } catch {
      /* o lead também chega pelo WhatsApp se a pessoa chamar */
    }
    setSending(false)
    setSent(true)
  }

  return (
    <section className="o30-sec o30-light" id="contato">
      <div className="o30-shell">
        <div className="o30-cta">
          <div className="o30-cta-copy">
            <h2>
              Bora conectar
              <br />
              sua casa?
            </h2>
            <p>Deixe seu WhatsApp. A gente responde em até 1 hora no horário comercial.</p>
            <a className="o30-cta-phone" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Phone /> {phone}
            </a>
          </div>

          <form className="o30-form" onSubmit={submit}>
            {sent ? (
              <div className="o30-thanks" role="status">
                <div className="check"><Check size={26} /></div>
                <h3>Pedido recebido!</h3>
                <p>Nossa equipe chama você no WhatsApp em até 1 hora útil. Obrigado por escolher a Ondeline.</p>
              </div>
            ) : (
              <>
                <label htmlFor="o30-nome">Nome</label>
                <input id="o30-nome" required autoComplete="name" placeholder="Como podemos te chamar?" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="o30-wa">WhatsApp</label>
                <input id="o30-wa" required type="tel" inputMode="tel" autoComplete="tel" placeholder="(92) 9 0000-0000" value={tel} onChange={(e) => setTel(e.target.value)} />
                <label htmlFor="o30-cidade">Cidade</label>
                <select id="o30-cidade" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option>Eirunepé</option>
                  <option>Ipixuna</option>
                  <option>Itamarati</option>
                  <option>Carauari (lista de espera)</option>
                </select>
                {planNames.length > 0 && (
                  <>
                    <label htmlFor="o30-plano">Plano de interesse</label>
                    <select id="o30-plano" value={plan} onChange={(e) => setPlan(e.target.value)}>
                      {planNames.map((p) => <option key={p}>{p}</option>)}
                      <option>Empresarial · consultar</option>
                    </select>
                  </>
                )}
                <button type="submit" disabled={sending}>
                  {sending ? "Enviando…" : "Quero assinar"} {!sending && <Arrow />}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
