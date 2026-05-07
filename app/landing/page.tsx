"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Icon } from "@/components/on2/Icon"
import "@/styles/ondeline2.css"

const WA = "5592984607721"
const PHONE = "(92) 98460-7721"

/* ── Urgency Strip ───────────────────────────────────────── */
function UrgencyStrip() {
  return (
    <div className="on2-urgency-strip">
      <span className="flash">⚡ Oferta relâmpago</span>
      <span className="pulse-dot" />
      <span>Só este mês: instalação grátis + primeiro mês por R$ 49,90 em todo o Vale do Juruá</span>
    </div>
  )
}

/* ── Nav minimalista ─────────────────────────────────────── */
function LandingNav() {
  return (
    <nav className="on2-landing-nav">
      <div className="on2-shell on2-landing-nav-inner">
        <a href="/" className="logo">
          <Image src="/logo-ondeline.png" alt="Ondeline" width={140} height={36} style={{ height: 36, width: "auto" }} />
        </a>
        <a href={`tel:+${WA}`} className="phone-cta">
          <Icon name="phone" size={16} />
          <span>Central <span className="num">{PHONE}</span></span>
        </a>
      </div>
    </nav>
  )
}

/* ── Countdown ───────────────────────────────────────────── */
function Countdown() {
  const [t, setT] = useState({ d: 3, h: 14, m: 27, s: 42 })

  useEffect(() => {
    const id = setInterval(() => {
      setT((prev) => {
        let { d, h, m, s } = prev
        s--
        if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) { h = 23; d-- }
        if (d < 0) { d = 0; h = 0; m = 0; s = 0 }
        return { d, h, m, s }
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="on2-countdown">
      <span className="label">Termina em:</span>
      {[{ n: pad(t.d), u: "dias" }, { n: pad(t.h), u: "horas" }, { n: pad(t.m), u: "min" }, { n: pad(t.s), u: "seg" }].map((b, i) => (
        <div className="box" key={i}>
          <div className="n">{b.n}</div>
          <div className="u">{b.u}</div>
        </div>
      ))}
    </div>
  )
}

/* ── Lead Form ───────────────────────────────────────────── */
function LeadForm() {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState("")
  const [tel, setTel] = useState("")
  const [city, setCity] = useState("Eirunepé")
  const [address, setAddress] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: tel, city, planInterest: "Correnteza · 1 Giga", email: "", status: "new", notes: `Landing: ${address}` }),
      })
    } catch {}
    setSent(true)
  }

  return (
    <div className="on2-lform-wrap">
      <div className="on2-lform">
        {!sent ? (
          <form onSubmit={handleSubmit}>
            <span className="kicker">Garanta o seu · Grátis</span>
            <h3>Receba a proposta no WhatsApp em 5 minutos</h3>
            <p className="fs">Sem compromisso. A gente confirma disponibilidade no seu endereço e envia tudo pronto.</p>

            <label>Nome completo</label>
            <input required placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />

            <label>WhatsApp</label>
            <input required type="tel" placeholder="(92) 98460-7721" value={tel} onChange={(e) => setTel(e.target.value)} />

            <label>Cidade</label>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option>Ipixuna</option>
              <option>Eirunepé</option>
              <option>Itamarati</option>
              <option>Carauari (lista de espera)</option>
            </select>

            <label>Endereço ou bairro</label>
            <input required placeholder="Rua, número e bairro" value={address} onChange={(e) => setAddress(e.target.value)} />

            <button type="submit">
              Quero minha proposta agora <Icon name="arrow" size={18} />
            </button>

            <div className="guarantee">
              <div className="sh"><Icon name="shield" size={16} /></div>
              <div>Sem taxa de instalação · Fidelidade opcional · Cancelamento sem multa nos primeiros 15 dias</div>
            </div>
          </form>
        ) : (
          <div className="on2-lform-sent">
            <div className="check">✓</div>
            <h4>Pedido recebido!</h4>
            <p>Em até <strong>5 minutos</strong> você recebe um WhatsApp do nosso time confirmando a disponibilidade e enviando o contrato pronto pra assinar.</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Hero ────────────────────────────────────────────────── */
function LandingHero() {
  return (
    <section className="on2-lhero" id="top">
      <div className="on2-shell">
        <div className="on2-lhero-grid">
          <div>
            <div className="on2-lhero-chip">🔥 Oferta de lançamento · maio/2026</div>
            <h1>
              Internet de <span className="giga">1 Giga</span> na sua casa por{" "}
              <span style={{ color: "#0fb8b3" }}>R$ 99,90</span>
              <span style={{ color: "#7a8ba0", fontSize: "0.55em" }}>/mês</span>
            </h1>
            <p className="sub">
              Fibra óptica dedicada, Wi-Fi 6 incluso, suporte 24 horas feito por gente do Vale do Juruá.
              Sem fidelidade obrigatória. Instalação em até 48 horas.
            </p>

            <div className="on2-price-block">
              <div>
                <div className="was">De R$ 199,90/mês</div>
                <div className="now">R$ 99<small>,90/mês</small></div>
                <span className="save">Você economiza R$ 1.200/ano</span>
              </div>
            </div>

            <Countdown />

            <div className="on2-benefits">
              {[
                "Instalação grátis neste mês (economia de R$ 299)",
                "Roteador Wi-Fi 6 em comodato — sem custo",
                "Fibra dedicada, velocidade real garantida 1:1",
                "Suporte local 24/7 em português e no WhatsApp",
                "Cancelamento sem multa nos primeiros 15 dias",
              ].map((b, i) => (
                <div className="item" key={i}>
                  <span className="ck"><Icon name="check" size={14} /></span>
                  {b}
                </div>
              ))}
            </div>

            <div className="on2-trust-row">
              <div className="stars">★★★★★</div>
              <div className="text">
                <strong>4,9</strong> em 312 avaliações · <strong>+1.200</strong> famílias conectadas no Juruá
              </div>
            </div>
          </div>

          <LeadForm />
        </div>
      </div>
    </section>
  )
}

/* ── Proof Strip ─────────────────────────────────────────── */
function ProofStrip() {
  return (
    <section className="on2-proof-strip">
      <div className="on2-shell">
        <div className="on2-proof-grid">
          {[
            { v: "+1.200", k: "Famílias já conectadas" },
            { v: "99,98%", k: "Uptime comprovado" },
            { v: "<5min", k: "Resposta no WhatsApp" },
            { v: "48h", k: "Prazo médio de instalação" },
          ].map((it, i) => (
            <div key={i}>
              <div className="v">{it.v}</div>
              <div className="k">{it.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Why Switch ──────────────────────────────────────────── */
function WhySwitch() {
  const bad = [
    "Velocidade cai toda hora, principalmente à noite",
    "Suporte demora dias ou fica em fila de call center",
    "Internet via rádio ou satélite com alta latência",
    "Contratos com fidelidade longa e multas altas",
    "Técnico vem de outra cidade, quando vem",
  ]
  const good = [
    "Fibra óptica dedicada 1:1 — mesma velocidade 24h",
    "WhatsApp com resposta em minutos, técnico local",
    "Latência de capital, ideal para jogos e chamadas",
    "Fidelidade opcional e cancelamento sem multa",
    "Equipe Ondeline mora e trabalha aqui, no Juruá",
  ]
  return (
    <section className="on2-switch-sec">
      <div className="on2-shell">
        <div className="on2-switch-head">
          <span className="on2-sec-lbl">Por que trocar</span>
          <h2 style={{ marginTop: 14 }}>Cansou de internet que <span>some quando mais precisa</span>?</h2>
          <p>A diferença entre a Ondeline e as opções antigas no Vale do Juruá é visível no primeiro dia.</p>
        </div>
        <div className="on2-compare">
          <div className="col bad">
            <div className="lbl">Internet antiga</div>
            <h4>O que você tem hoje</h4>
            <ul>
              {bad.map((b, i) => <li key={i}><span className="mk">✕</span>{b}</li>)}
            </ul>
          </div>
          <div className="col good">
            <div className="lbl">Ondeline</div>
            <h4>O que você passa a ter</h4>
            <ul>
              {good.map((g, i) => <li key={i}><span className="mk">✓</span>{g}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ─────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  { q: "A oferta de R$ 99,90 é só no primeiro mês?", a: "Não. Os R$ 99,90 valem pelos primeiros 12 meses de contrato. Depois disso, o valor passa para R$ 139,90/mês, que continua sendo um dos melhores preços por 1 Giga da região. Você recebe um aviso com 30 dias de antecedência antes de qualquer reajuste." },
  { q: "Minha região tem cobertura?", a: "A Ondeline atende Ipixuna, Eirunepé e Itamarati com rede ativa, e está em implantação em Carauari. Preencha o formulário com seu endereço e em 5 minutos confirmamos se a fibra já passa na sua rua." },
  { q: "Tem fidelidade? E se eu quiser cancelar?", a: "A fidelidade é opcional — 12 meses para garantir a promoção. Você pode também contratar sem fidelidade (valor um pouco maior) e cancelar quando quiser. Nos primeiros 15 dias, cancelamento é 100% gratuito em qualquer modalidade." },
  { q: "Quanto tempo demora a instalação?", a: "48 horas em Eirunepé, Ipixuna e Itamarati. Se o endereço já tem infraestrutura pronta, instalamos no mesmo dia. Você escolhe o horário pelo WhatsApp — manhã, tarde ou sábado." },
  { q: "O Wi-Fi é bom pra casa toda?", a: "Incluímos um roteador Wi-Fi 6 de alto desempenho em comodato (sem custo). Para casas grandes ou com muitos cômodos, oferecemos kit Mesh com 2 ou 3 pontos, também em comodato no plano de 1 Giga." },
  { q: "Como é o atendimento se der problema?", a: "Nosso suporte é 24/7 via WhatsApp, com tempo médio de resposta abaixo de 5 minutos. O time é todo local — atende em português, sem robô, sem fila. Se precisar, técnico vai até sua casa no mesmo dia." },
]

function FAQ() {
  return (
    <section className="on2-faq-sec">
      <div className="on2-shell">
        <div className="on2-switch-head">
          <span className="on2-sec-lbl">Dúvidas frequentes</span>
          <h2 style={{ marginTop: 14 }}>Perguntas que <span>todo novo cliente faz</span></h2>
        </div>
        <div className="on2-faq-list">
          {FAQ_ITEMS.map((it, i) => (
            <details className="on2-faq-item" key={i}>
              <summary>{it.q}</summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Final CTA ───────────────────────────────────────────── */
function FinalCTA() {
  function scrollTop(e: React.MouseEvent) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  return (
    <section className="on2-final-cta">
      <div className="on2-shell">
        <h2>Ainda dá tempo de pegar a oferta deste mês.</h2>
        <p>1 Giga por R$ 99,90 com instalação grátis e roteador Wi-Fi 6 incluso. A partir do dia 30, a promoção acaba e o preço volta a R$ 139,90.</p>
        <a href="#top" onClick={scrollTop} className="ccta">
          Quero garantir minha vaga <Icon name="arrow" size={18} />
        </a>
      </div>
    </section>
  )
}

/* ── Footer minimalista ──────────────────────────────────── */
function LandingFooter() {
  return (
    <footer className="on2-lfoot">
      <div className="on2-shell">
        © 2023–2026 Ondeline Telecom · Vale do Juruá / AM ·{" "}
        <a href="/">Site institucional</a> ·{" "}
        <a href="/empresas">Planos empresariais</a>
      </div>
    </footer>
  )
}

/* ── Page ────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="on2" id="top">
      <UrgencyStrip />
      <LandingNav />
      <LandingHero />
      <ProofStrip />
      <WhySwitch />
      <FAQ />
      <FinalCTA />
      <LandingFooter />
    </div>
  )
}
