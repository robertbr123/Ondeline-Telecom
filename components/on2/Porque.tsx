import { Icon } from "./Icon"

const ITEMS = [
  { icon: "fiber", title: "Fibra óptica até sua casa", text: "Tecnologia GPON, cabo óptico direto do poste ao seu roteador. Sem rádio, sem compartilhamento." },
  { icon: "support", title: "Suporte local 24h", text: "Atendimento humano em português claro, com técnicos que moram nas mesmas cidades que você." },
  { icon: "wifi", title: "Wi-Fi 6 incluso", text: "Roteador moderno e potente sem custo adicional nos planos Fluxo e Correnteza." },
  { icon: "shield", title: "Estabilidade garantida", text: "Backbone redundante via Tefé e Manaus. Se um caminho cai, o outro assume na hora." },
  { icon: "bolt", title: "Baixa latência pra jogos", text: "14 ms de ping ao CDN mais próximo. Jogue online sem lag, mesmo morando no interior." },
  { icon: "heart", title: "Sem pegadinha na fatura", text: "O que está no plano é o que vem na conta. Sem reajuste surpresa, sem taxa escondida." },
]

export function Porque() {
  return (
    <section className="on2-sec" id="porque">
      <div className="on2-shell">
        <div className="on2-sec-head center">
          <span className="on2-sec-lbl">Por que Ondeline</span>
          <h2>Internet de capital, <span>atendimento do Juruá</span>.</h2>
          <p>Somos de Eirunepé. Nossa equipe conhece cada rua, cada ponte e cada cliente pelo nome. Isso muda tudo.</p>
        </div>
        <div className="on2-why-grid">
          {ITEMS.map((it, i) => (
            <div className="on2-why-card" key={i}>
              <div className="on2-why-icon"><Icon name={it.icon} /></div>
              <h4>{it.title}</h4>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
