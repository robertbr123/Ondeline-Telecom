import { Arrow, Check } from "./icons"
import { type PublicPlan, speedNumber, splitPrice } from "@/lib/plans"

export function Plans({ plans, whatsapp }: { plans: PublicPlan[]; whatsapp: string }) {
  // Do mais lento para o mais rápido
  const list = [...plans].sort((a, b) => speedNumber(a.speed) - speedNumber(b.speed))

  return (
    <section className="o30-sec o30-light" id="planos">
      <div className="o30-shell">
        <div className="o30-sec-head">
          <div>
            <div className="o30-eyebrow">01 — Planos</div>
            <h2 className="o30-h2">
              Escolha sua velocidade.
              <br />
              <span className="soft">Sem letra miúda.</span>
            </h2>
          </div>
          <p>Instalação grátis, sem taxa escondida. O que está no plano é o que vem na conta.</p>
        </div>

        {list.length === 0 ? (
          <p style={{ marginTop: 48, fontSize: 17 }}>
            Fale com a gente no{" "}
            <a href={`https://wa.me/${whatsapp}`} style={{ fontWeight: 600, textDecoration: "underline" }}>
              WhatsApp
            </a>{" "}
            para ver os planos da sua cidade.
          </p>
        ) : (
          <div className="o30-plans">
            {list.map((p) => {
              const speed = speedNumber(p.speed)
              const { reais, centavos } = splitPrice(p.price)
              return (
                <article key={p.id} className={"o30-plan" + (p.highlighted ? " featured" : "")}>
                  <div className="o30-plan-top">
                    <h3 className="o30-plan-name">{p.name}</h3>
                    {p.highlighted && <span className="o30-plan-badge">Mais escolhido</span>}
                  </div>
                  <div className="o30-plan-speed">
                    <span className="n">{speed || p.speed}</span>
                    {speed > 0 && <span className="u">Mega</span>}
                  </div>
                  <div className="o30-plan-desc">{p.description}</div>
                  <div className="o30-plan-price">
                    R$ {reais}
                    {centavos && `,${centavos}`}
                    <small>/mês</small>
                  </div>
                  <div className="o30-plan-rule" />
                  <ul>
                    {p.features.map((f, i) => (
                      <li key={i}>
                        <Check />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    className="o30-plan-btn"
                    href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de assinar o plano ${p.name} (${p.speed}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Quero este plano <Arrow size={16} />
                  </a>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
