import { Icon } from "./Icon"

export function Hero({
  whatsapp,
  title = "A internet mais rápida do Vale do Juruá.",
  subtitle = "Fibra óptica 100% dedicada, Wi-Fi 6 incluso e suporte local que fala sua língua. Conectamos mais de 1.000 famílias em Ipixuna, Eirunepé e Itamarati — e vamos mais longe.",
  badge = "Planos Giga disponíveis em Eirunepé",
}: {
  whatsapp?: string
  title?: string
  subtitle?: string
  badge?: string
}) {
  const wa = whatsapp || "5592984607721"
  return (
    <section className="on2-hero" id="top">
      <div className="on2-shell on2-hero-inner">
        <div>
          <div className="on2-hero-pill">
            <span className="tag">NOVO</span>
            {badge}
          </div>
          <h1>
            {title.includes("Vale do Juruá") ? (
              <>
                {title.split("Vale do Juruá")[0]}<span className="highlight">Vale do Juruá</span>{title.split("Vale do Juruá")[1]}
              </>
            ) : (
              title
            )}
          </h1>
          <p className="on2-hero-sub">
            {subtitle}
          </p>
          <div className="on2-hero-actions">
            <a href="#planos" className="on2-btn on2-btn-primary">
              Ver planos <Icon name="arrow" size={18} />
            </a>
            <a href="#cobertura" className="on2-btn on2-btn-ghost">
              Tem na minha rua?
            </a>
          </div>
          <div className="on2-hero-stats">
            <div className="cell">
              <div className="v">+1.000</div>
              <div className="k">Assinantes</div>
            </div>
            <div className="cell">
              <div className="v">99,98%</div>
              <div className="k">Uptime da rede</div>
            </div>
            <div className="cell">
              <div className="v">24h</div>
              <div className="k">Suporte local</div>
            </div>
          </div>
        </div>

        <div className="on2-hv">
          <div className="on2-hv-blob" />
          <div className="on2-hv-dot" />
          <div className="on2-hv-card">
            <div className="on2-hv-top">
              <div className="on2-hv-plan-tag">
                <span className="dot" /> PLANO FLUXO · MAIS POPULAR
              </div>
              <div className="on2-hv-speed">
                <div className="n">600<span className="u">MEGA</span></div>
                <div className="label">Download e upload simétricos</div>
              </div>
              <div className="on2-hv-price">
                <span className="curr">R$</span>
                <span className="big">139</span>
                <span className="small">,90<small>/mês</small></span>
              </div>
              <a href={`https://wa.me/${wa}?text=Olá! Gostaria de assinar o Plano Fluxo`} target="_blank" rel="noopener noreferrer" className="on2-hv-cta">
                Quero este plano <Icon name="arrow" size={16} />
              </a>
            </div>
            <div className="on2-hv-bot">
              <div className="on2-hv-feat">
                <div className="ico"><Icon name="bolt" size={18} /></div>
                <div><div className="k">Latência</div><div className="v">14 ms</div></div>
              </div>
              <div className="on2-hv-feat">
                <div className="ico" style={{ background: "#fff0ec", color: "#ff6b4a" }}><Icon name="wifi" size={18} /></div>
                <div><div className="k">Wi-Fi 6</div><div className="v">Incluso</div></div>
              </div>
              <div className="on2-hv-feat">
                <div className="ico" style={{ background: "#fff8e0", color: "#d4a500" }}><Icon name="heart" size={18} /></div>
                <div><div className="k">Avaliação</div><div className="v">4,9 <span className="stars">★★★★★</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
