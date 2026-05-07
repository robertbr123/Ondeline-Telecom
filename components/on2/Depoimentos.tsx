const ITEMS = [
  { q: "Antes da Ondeline, atender por vídeo era impossível. Hoje faço 40 consultas online por mês. Mudou minha clínica inteira.", n: "Dra. Rosa Menezes", w: "Clínica São Rafael · Eirunepé", l: "R" },
  { q: "Sou professor e dou aula online pra várias cidades. Nunca mais caiu. É como se eu morasse em capital.", n: "Jonas da Silva", w: "Escola Estadual · Ipixuna", l: "J" },
  { q: "Tenho mercadinho e uso maquininha o dia todo. Com a Ondeline nunca mais perdi venda por queda de internet.", n: "Maria do Carmo", w: "Mercadinho do Juruá · Itamarati", l: "M" },
]

export function Depoimentos() {
  return (
    <section className="on2-sec alt">
      <div className="on2-shell">
        <div className="on2-sec-head center">
          <span className="on2-sec-lbl">Vozes do Juruá</span>
          <h2>Mais de 1K famílias <span>já são Ondeline</span>.</h2>
          <p>Sem atores, sem texto de agência. São clientes reais, das cidades que a gente atende todo dia.</p>
        </div>
        <div className="on2-testi-grid">
          {ITEMS.map((t, i) => (
            <div className="on2-testi" key={i}>
              <div className="stars">★★★★★</div>
              <q>{t.q}</q>
              <div className="who">
                <div className="avatar">{t.l}</div>
                <div>
                  <div className="who-name">{t.n}</div>
                  <div className="who-city">{t.w}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
