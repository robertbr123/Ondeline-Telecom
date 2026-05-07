import Image from "next/image"
import { Icon } from "./Icon"

export function Footer({ whatsapp, phone, logo }: { whatsapp?: string; phone?: string; logo?: string }) {
  const wa = whatsapp || "5592984607721"
  const tel = phone || "(92) 98460-7721"
  const logoSrc = logo || "/logo-ondeline.png"

  return (
    <footer className="on2-footer">
      <div className="on2-shell">
        <div className="on2-foot-top">
          <div className="on2-foot-brand">
            <Image src={logoSrc} alt="Ondeline" width={140} height={44} style={{ height: 44, width: "auto", marginBottom: 20, filter: "brightness(1.2)" }} />
            <p>Provedor de internet por fibra óptica do Vale do Juruá. Conexão sem limites para cada canto do Amazonas.</p>
          </div>
          <div>
            <h5>Planos</h5>
            <ul>
              <li><a href="#planos">Residencial</a></li>
              <li><a href="/empresas">Empresarial</a></li>
              <li><a href="/empresas">Link dedicado</a></li>
              <li><a href="/empresas">IP fixo</a></li>
            </ul>
          </div>
          <div>
            <h5>Suporte</h5>
            <ul>
              <li><a href="https://ondeline.sgp.tsmx.com.br/accounts/central/login" target="_blank" rel="noopener noreferrer">Central do cliente</a></li>
              <li><a href="https://ondeline.sgp.tsmx.com.br/accounts/central/login" target="_blank" rel="noopener noreferrer">2ª via de boleto</a></li>
              <li><a href="/status">Status da rede</a></li>
              <li><a href="/teste-velocidade">Teste de velocidade</a></li>
            </ul>
          </div>
          <div>
            <h5>Contato</h5>
            <ul>
              <li><a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">WhatsApp {tel}</a></li>
              <li><a href="mailto:contato@ondeline.com.br">contato@ondeline.com.br</a></li>
              <li><a href={`tel:+${wa}`}>{tel}</a></li>
              <li><a href="/indicar">Programa de indicação</a></li>
            </ul>
          </div>
        </div>
        <div className="on2-foot-bot">
          <div>© 2023–2026 Ondeline Telecom · Todos os direitos reservados</div>
          <div className="on2-foot-socials">
            <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Icon name="wa" size={18} /></a>
            <a href="#" aria-label="Instagram"><Icon name="ig" size={18} /></a>
            <a href="#" aria-label="Facebook"><Icon name="fb" size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
