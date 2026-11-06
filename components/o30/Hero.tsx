import { Arrow } from "./icons"
import { type PublicPlan, speedNumber, splitPrice } from "@/lib/plans"

const FIBER = "M-20 640 C 320 600, 520 420, 820 430 S 1260 260, 1460 140"

export function Hero({ plan, whatsapp }: { plan?: PublicPlan; whatsapp: string }) {
  const speed = plan ? speedNumber(plan.speed) : 0
  const price = plan ? splitPrice(plan.price) : null
  const hasIptv = plan?.features.some((f) => /iptv/i.test(f))
  const hasMesh = plan?.features.some((f) => /mesh/i.test(f))
  const hasLong = plan?.features.some((f) => /longo alcance/i.test(f))

  return (
    <section className="o30-hero" id="top">
      <svg className="o30-hero-bg" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1440 820">
        <defs>
          <pattern id="o30-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
          </pattern>
          {/* a fibra some atrás do texto e acende do lado direito */}
          <linearGradient id="o30-fade" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#22e3d6" stopOpacity="0" />
            <stop offset="0.42" stopColor="#22e3d6" stopOpacity="0.05" />
            <stop offset="0.62" stopColor="#22e3d6" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="1440" height="820" fill="url(#o30-grid)" opacity="0.5" />
        <path d={FIBER} fill="none" stroke="url(#o30-fade)" strokeOpacity="0.18" strokeWidth="10" />
        <path className="o30-fiber" d={FIBER} fill="none" stroke="url(#o30-fade)" strokeWidth="1.6" strokeDasharray="60 340" strokeLinecap="round" />
        <path d="M-20 700 C 360 690, 640 560, 900 560 S 1300 440, 1460 400" fill="none" stroke="url(#o30-fade)" strokeOpacity="0.12" strokeWidth="1" />
      </svg>

      <div className="o30-shell o30-hero-inner">
        <div className="o30-hero-copy">
          <div className="o30-live-pill">
            <span className="o30-dot"><span className="o30-ping" /><span /></span>
            Rede online agora · Ipixuna · Eirunepé · Itamarati
          </div>
          <h1>
            Fibra de verdade
            <br />
            no coração do
            <br />
            <em>Juruá.</em>
          </h1>
          <p className="o30-hero-sub">
            Internet por fibra óptica com Wi-Fi de longo alcance, IPTV grátis nos planos maiores e um suporte que mora
            na sua cidade.
          </p>
          <div className="o30-hero-actions">
            <a href="#planos" className="o30-btn o30-btn-teal">
              Ver planos <Arrow />
            </a>
            <a href="#cobertura" className="o30-btn o30-btn-ghost">
              Tem na minha rua?
            </a>
          </div>
          <div className="o30-stats">
            <div><div className="v">+1.000</div><div className="k">famílias conectadas</div></div>
            <div><div className="v">99,98%</div><div className="k">rede no ar</div></div>
            <div><div className="v">24h</div><div className="k">suporte local</div></div>
          </div>
        </div>

        {plan && price && (
          <div className="o30-live">
            <div className="o30-live-top">
              <span className="lbl">SUA CONEXÃO · AO VIVO</span>
              <span className="ok">estável</span>
            </div>
            <div className="o30-live-speed">
              <span className="n">{speed || plan.speed}</span>
              <span className="u">Mega · {plan.name}</span>
            </div>
            <svg className="o30-live-chart" viewBox="0 0 380 90" preserveAspectRatio="none" role="img" aria-label="Velocidade estável ao longo do dia">
              <path d="M0 52 L30 48 L60 50 L90 44 L120 46 L150 40 L180 42 L210 38 L240 41 L270 36 L300 39 L330 35 L380 37 L380 90 L0 90 Z" fill="rgba(34,227,214,0.10)" />
              <path d="M0 52 L30 48 L60 50 L90 44 L120 46 L150 40 L180 42 L210 38 L240 41 L270 36 L300 39 L330 35 L380 37" fill="none" stroke="#22e3d6" strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="o30-live-feats">
              <div><div className="k">Wi-Fi</div><div className="v">{hasLong ? "Longo alcance" : "Incluso"}</div></div>
              <div><div className="k">TV</div><div className="v">{hasIptv ? "IPTV grátis" : "—"}</div></div>
              <div><div className="k">Roteador</div><div className="v">{hasMesh ? "Mesh" : "Incluso"}</div></div>
            </div>
            <a
              className="o30-live-cta"
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Olá! Quero assinar o plano ${plan.name} (${plan.speed}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                R$ {price.reais}
                {price.centavos && `,${price.centavos}`}
                <small>/mês</small>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                Quero este <Arrow size={16} />
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
