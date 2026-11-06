import { Arrow } from "./icons"

const CITIES = [
  { name: "Eirunepé", href: "/eirunepe", on: true },
  { name: "Ipixuna", href: "/ipixuna", on: true },
  { name: "Itamarati", href: "/itamarati", on: true },
  { name: "Carauari", href: "/carauari", on: false },
]

const RIVER = "M40 70 C 130 140, 150 240, 230 300 S 360 390, 460 470"

export function Coverage() {
  return (
    <section className="o30-sec o30-dark" id="cobertura">
      <div className="o30-shell o30-cov">
        <div>
          <div className="o30-eyebrow">03 — Cobertura</div>
          <h2 className="o30-h2">
            O Vale do Juruá
            <br />
            inteiro na fibra.
          </h2>
          <p className="o30-cov-sub">
            Três cidades já navegando e Carauari chegando. Toque na sua cidade e veja os planos de lá.
          </p>
          <div className="o30-cities">
            {CITIES.map((c, i) => (
              <a key={c.href} href={c.href} className="o30-city">
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="name">{c.name}</span>
                <span className={"pill" + (c.on ? "" : " soon")}>{c.on ? "Ativa" : "Em breve"}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="o30-map">
            <svg viewBox="0 0 500 500" role="img" aria-label="Mapa das cidades atendidas no Vale do Juruá: Ipixuna, Eirunepé e Itamarati ativas, Carauari em breve">
              <defs>
                <pattern id="o30-dots" width="25" height="25" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.08)" />
                </pattern>
              </defs>
              <rect width="500" height="500" fill="url(#o30-dots)" />
              <path d={RIVER} fill="none" stroke="rgba(34,227,214,0.25)" strokeWidth="14" strokeLinecap="round" />
              <path className="o30-fiber" d={RIVER} fill="none" stroke="#22e3d6" strokeWidth="2" strokeDasharray="40 260" strokeLinecap="round" />
              <g fontFamily="var(--sans)" fontSize="15" fontWeight="600">
                <a href="/ipixuna"><circle cx="95" cy="118" r="8" fill="#22e3d6" /><text x="112" y="123" fill="#fff">Ipixuna</text></a>
                <a href="/eirunepe"><circle cx="185" cy="262" r="11" fill="#22e3d6" /><text x="204" y="267" fill="#fff">Eirunepé</text></a>
                <a href="/itamarati"><circle cx="285" cy="333" r="8" fill="#22e3d6" /><text x="302" y="338" fill="#fff">Itamarati</text></a>
                <a href="/carauari"><circle cx="380" cy="410" r="8" fill="none" stroke="#ffb35c" strokeWidth="2.5" /><text x="397" y="415" fill="#ffd29c">Carauari</text></a>
              </g>
              <text x="28" y="476" fontSize="11" letterSpacing="2" fill="#8fa2b2" fontFamily="var(--mono)">VALE DO JURUÁ · AM</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
