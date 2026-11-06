import { Headset, Tv, Wifi } from "./icons"

const FIBER = "M0 260 C 160 250, 260 150, 380 150 S 560 60, 620 30"

export function Why() {
  return (
    <section className="o30-sec o30-white" id="porque">
      <div className="o30-shell">
        <div className="o30-eyebrow">02 — Por que Ondeline</div>
        <h2 className="o30-h2" style={{ maxWidth: 820 }}>
          Internet de capital.
          <br />
          <span className="soft">Atendimento de vizinho.</span>
        </h2>

        <div className="o30-bento">
          <div className="o30-tile big">
            <svg className="art" aria-hidden="true" viewBox="0 0 600 300">
              <path d={FIBER} fill="none" stroke="rgba(34,227,214,0.2)" strokeWidth="12" />
              <path className="o30-fiber" d={FIBER} fill="none" stroke="#22e3d6" strokeWidth="2" strokeDasharray="50 350" strokeLinecap="round" />
            </svg>
            <div className="tag">FIBRA ÓPTICA GPON</div>
            <div>
              <h3>
                Do poste até o seu
                <br />
                roteador, só luz.
              </h3>
              <p>Sem rádio, sem antena compartilhada. Chuva forte não derruba a sua conexão.</p>
            </div>
          </div>
          <div className="o30-tile wide">
            <Headset className="ico" />
            <div>
              <h3>Suporte que mora na sua cidade</h3>
              <p>Atendimento humano 24h, com técnico que conhece a sua rua.</p>
            </div>
          </div>
          <div className="o30-tile">
            <Wifi className="ico" />
            <div>
              <h3>Wi-Fi de longo alcance</h3>
              <p>Roteador mesh: sinal forte na casa toda.</p>
            </div>
          </div>
          <div className="o30-tile">
            <Tv className="ico" />
            <div>
              <h3>IPTV grátis</h3>
              <p>Canais de TV inclusos nos planos maiores.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
