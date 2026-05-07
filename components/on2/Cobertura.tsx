import { Icon } from "./Icon"

const CITIES = [
  { name: "Ipixuna", state: "AM", status: "active", info: "Rede ativa · ≈ 26k hab.", letter: "I", href: "/ipixuna", x: 70, y: 100 },
  { name: "Eirunepé", state: "AM · Hub", status: "active", info: "Hub regional · ≈ 34k hab.", letter: "E", href: "/eirunepe", x: 140, y: 230, hub: true },
  { name: "Itamarati", state: "AM", status: "active", info: "Rede ativa · ≈ 9k hab.", letter: "I", href: "/itamarati", x: 220, y: 280 },
  { name: "Carauari", state: "AM", status: "soon", info: "Em breve · Q3 2026", letter: "C", href: "/carauari", x: 290, y: 360 },
]

export function Cobertura() {
  return (
    <section className="on2-sec alt" id="cobertura">
      <div className="on2-shell">
        <div className="on2-cov-wrap">
          <div>
            <span className="on2-sec-lbl">Cobertura Ondeline</span>
            <h2 style={{ fontSize: "clamp(32px,4.2vw,52px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.05, marginBottom: 18, color: "var(--ink)" }}>
              Conectamos o <span style={{ color: "var(--teal)" }}>Vale do Juruá</span> inteiro.
            </h2>
            <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 36, maxWidth: "52ch" }}>
              Três cidades já navegando em fibra e mais uma chegando em 2026. Confira se sua cidade está na rede Ondeline.
            </p>

            <div className="on2-cities-list">
              {CITIES.map((c, i) => (
                <a className="on2-city-item" key={i} href={c.href}>
                  <div className={"on2-city-badge " + c.status}>{c.letter}</div>
                  <div className="on2-city-info">
                    <h5>{c.name}</h5>
                    <p>{c.info}</p>
                  </div>
                  <div className={"on2-city-status " + c.status}>
                    {c.status === "active" ? "Ativa" : "Em breve"}
                  </div>
                  <span className="arr"><Icon name="arrow" size={18} /></span>
                </a>
              ))}
            </div>
          </div>

          <div className="on2-map-wrap">
            <svg className="on2-map-svg" viewBox="0 0 400 500">
              <defs>
                <linearGradient id="on2-riv" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#14d4cf" />
                  <stop offset="100%" stopColor="#0a8a86" />
                </linearGradient>
                <radialGradient id="on2-gA"><stop offset="0%" stopColor="#0fb8b3" stopOpacity="0.35" /><stop offset="100%" stopColor="#0fb8b3" stopOpacity="0" /></radialGradient>
                <radialGradient id="on2-gS"><stop offset="0%" stopColor="#ff6b4a" stopOpacity="0.25" /><stop offset="100%" stopColor="#ff6b4a" stopOpacity="0" /></radialGradient>
              </defs>

              {Array.from({ length: 10 }).map((_, i) => <line key={"h" + i} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="rgba(10,37,64,0.05)" />)}
              {Array.from({ length: 8 }).map((_, i) => <line key={"v" + i} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="rgba(10,37,64,0.05)" />)}

              <path d="M 30 60 C 100 120, 120 200, 180 260 S 280 340, 350 460" fill="none" stroke="url(#on2-riv)" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              <path d="M 30 60 C 100 120, 120 200, 180 260 S 280 340, 350 460" fill="none" stroke="#14d4cf" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round" opacity="0.8">
                <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="4s" repeatCount="indefinite" />
              </path>

              {CITIES.map((c, i) => (
                <a key={i} href={c.href}>
                  <g>
                    <circle cx={c.x} cy={c.y} r="45" fill={c.status === "active" ? "url(#on2-gA)" : "url(#on2-gS)"} />
                    {c.status === "active" && (
                      <circle cx={c.x} cy={c.y} r="12" fill="none" stroke="#0fb8b3" strokeWidth="1.5" opacity="0.5">
                        <animate attributeName="r" from="10" to="28" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.5" to="0" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle cx={c.x} cy={c.y} r={(c as any).hub ? 9 : 6} fill={c.status === "active" ? "#0fb8b3" : "#ff6b4a"} stroke="#fff" strokeWidth="2.5" />
                    <text x={c.x + 16} y={c.y + 4} fontSize="14" fontWeight="700" fill="#0a2540">{c.name}</text>
                  </g>
                </a>
              ))}

              <text x="20" y="480" fontSize="10" fontWeight="600" fill="#7a8ba0" letterSpacing="1">VALE DO JURUÁ · AM</text>
              <g transform="translate(360, 30)">
                <circle r="18" fill="#fff" stroke="#cfd8e0" />
                <text y="4" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0fb8b3">N</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
