export function Footer({
  logo,
  whatsapp,
  phone,
  instagram,
  facebook,
}: {
  logo: string
  whatsapp: string
  phone: string
  instagram?: string
  facebook?: string
}) {
  const ig = instagram || "https://www.instagram.com/ondelinetec"
  const year = new Date().getFullYear()
  return (
    <footer className="o30-footer">
      <div className="o30-shell">
        <div className="o30-footer-top">
          <div>
            <a href="/" className="o30-brand" aria-label="Ondeline — início">
              <span className="o30-brand-chip">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt="" width={30} height={30} />
              </span>
              ondeline
            </a>
            <p className="o30-footer-about">Internet por fibra óptica em Eirunepé, Ipixuna e Itamarati. Carauari em breve.</p>
          </div>
          <div>
            <h4>Ondeline</h4>
            <ul>
              <li><a href="/#planos">Planos</a></li>
              <li><a href="/empresas">Empresas</a></li>
              <li><a href="/indicar">Indique e ganhe</a></li>
              <li><a href="/trabalhe-conosco">Trabalhe conosco</a></li>
            </ul>
          </div>
          <div>
            <h4>Cliente</h4>
            <ul>
              <li><a href="https://ondeline.sgp.tsmx.com.br/accounts/central/login" target="_blank" rel="noopener noreferrer">Área do cliente</a></li>
              <li><a href="/teste-velocidade">Teste de velocidade</a></li>
              <li><a href="/status">Status da rede</a></li>
              <li><a href="/privacidade">Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp {phone}</a></li>
              <li><a href="mailto:contato@ondeline.com.br">contato@ondeline.com.br</a></li>
              <li><a href={ig} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              {facebook && <li><a href={facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>}
            </ul>
          </div>
        </div>
        <div className="o30-footer-bot">
          <span>© {year} Ondeline Telecom · Vale do Juruá, AM</span>
          <span>Fibra óptica · Amazonas</span>
        </div>
      </div>
    </footer>
  )
}
