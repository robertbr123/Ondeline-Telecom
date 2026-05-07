export function Topbar({ phone }: { phone?: string }) {
  const tel = phone || "(92) 98460-7721"
  const wa = phone ? phone.replace(/\D/g, "") : "5592984607721"
  return (
    <div className="on2-topbar">
      <div className="on2-shell row">
        <div className="left">
          <span><span className="dot" />Rede online · 99,98% uptime</span>
          <span style={{ opacity: 0.6 }}>|</span>
          <span>Vale do Juruá · AM</span>
        </div>
        <div className="left">
          <span>Central: <a href={`tel:+${wa}`}>{tel}</a></span>
          <span style={{ opacity: 0.4 }}>|</span>
          <a href="https://ondeline.sgp.tsmx.com.br/accounts/central/login" target="_blank" rel="noopener noreferrer">Área do cliente</a>
        </div>
      </div>
    </div>
  )
}
