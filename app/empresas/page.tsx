import type { Metadata } from "next"
import { getSiteConfig } from "@/lib/site-config"
import { Topbar } from "@/components/on2/Topbar"
import { Nav } from "@/components/on2/Nav"
import { Footer } from "@/components/on2/Footer"
import { SmartFloatCTA } from "@/components/on2/SmartFloatCTA"
import { Icon } from "@/components/on2/Icon"

export const metadata: Metadata = {
  title: "Internet Empresarial no Vale do Juruá | Ondeline Telecom",
  description:
    "Internet empresarial, link dedicado, IP fixo e suporte prioritário para comércios, escolas, clínicas, órgãos públicos e empresas em Ipixuna, Eirunepé, Itamarati e Carauari.",
  alternates: { canonical: "/empresas" },
  openGraph: {
    title: "Internet Empresarial Ondeline",
    description: "Conexão corporativa com suporte local, SLA comercial e projetos sob medida no interior do Amazonas.",
    type: "website",
    images: [{ url: "/business-office-internet.jpg", width: 1200, height: 630 }],
  },
}

const WA_MESSAGE = encodeURIComponent(
  "Olá! Quero falar sobre internet empresarial da Ondeline para minha empresa."
)

const SERVICES = [
  {
    icon: "fiber",
    title: "Internet corporativa",
    description: "Planos empresariais para lojas, escritórios, clínicas, escolas e operações com muitos dispositivos.",
    features: ["Banda dimensionada por uso", "Roteador profissional", "Instalação técnica local"],
  },
  {
    icon: "bolt",
    title: "Link dedicado",
    description: "Conexão sob medida para empresas que precisam de estabilidade, baixa latência e atendimento prioritário.",
    features: ["Banda simétrica sob consulta", "SLA comercial", "Monitoramento de disponibilidade"],
  },
  {
    icon: "shield",
    title: "IP fixo e rede segura",
    description: "Estrutura para câmeras, sistemas, servidores locais, ERPs, VPNs e acesso remoto com mais previsibilidade.",
    features: ["IP fixo opcional", "Configuração de rede", "Orientação técnica"],
  },
]

const SEGMENTS = [
  "Comércio e mercados",
  "Clínicas e consultórios",
  "Escolas e cursos",
  "Hotéis e pousadas",
  "Órgãos públicos",
  "Escritórios e serviços",
]

const FAQS = [
  {
    q: "Qual a diferença entre plano residencial e empresarial?",
    a: "O empresarial é dimensionado para uso contínuo, vários equipamentos, sistemas internos e suporte com prioridade comercial.",
  },
  {
    q: "A Ondeline oferece link dedicado?",
    a: "Sim. O projeto é feito sob consulta, considerando endereço, necessidade de banda, redundância, IP fixo e SLA desejado.",
  },
  {
    q: "Atende empresas fora do centro?",
    a: "A disponibilidade depende da cidade e do ponto de instalação. A equipe confirma por bairro, rua ou referência pelo WhatsApp.",
  },
  {
    q: "Vocês configuram Wi-Fi para clientes e funcionários?",
    a: "Sim. Podemos separar rede de visitantes, rede interna, equipamentos de caixa, câmeras e sistemas administrativos.",
  },
]

export default async function EmpresasPage() {
  const config = await getSiteConfig()
  const wa = config.whatsappNumber || "5592984607721"
  const phone = config.contactPhone || "(92) 98460-7721"
  const logo = config.logoUrl || "/logo-ondeline.png"
  const whatsappUrl = `https://wa.me/${wa}?text=${WA_MESSAGE}`

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Internet empresarial Ondeline",
    serviceType: "Internet empresarial, link dedicado e IP fixo",
    provider: {
      "@type": "InternetServiceProvider",
      name: "Ondeline Telecom",
      telephone: phone,
      url: "https://ondeline.com.br",
    },
    areaServed: ["Ipixuna", "Eirunepé", "Itamarati", "Carauari", "Vale do Juruá"],
  }

  return (
    <div className="on2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Topbar phone={phone} />
      <Nav whatsapp={wa} logo={logo} />

      <section className="on2-page-hero">
        <div className="on2-shell on2-page-hero-grid">
          <div>
            <span className="on2-sec-lbl">Empresas Ondeline</span>
            <h1>Internet para empresas que não podem parar.</h1>
            <p>
              Link empresarial, IP fixo, rede Wi-Fi profissional e suporte local para negócios no Vale do Juruá.
              A equipe técnica conhece sua cidade e monta o projeto conforme sua operação.
            </p>
            <div className="on2-page-actions">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="on2-btn on2-btn-primary">
                Falar com consultor <Icon name="arrow" size={18} />
              </a>
              <a href="#solucoes" className="on2-btn on2-btn-ghost">
                Ver soluções
              </a>
            </div>
          </div>

          <div className="on2-hv">
            <div className="on2-hv-card">
              <div className="on2-hv-top">
                <div className="on2-hv-plan-tag"><span className="dot" /> PROJETO EMPRESARIAL</div>
                <div className="on2-hv-speed">
                  <div className="n">SLA<span className="u">LOCAL</span></div>
                  <div className="label">Suporte prioritário e implantação técnica</div>
                </div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="on2-hv-cta">
                  Solicitar proposta <Icon name="arrow" size={16} />
                </a>
              </div>
              <div className="on2-hv-bot">
                <div className="on2-hv-feat">
                  <div className="ico"><Icon name="shield" size={18} /></div>
                  <div><div className="k">IP fixo</div><div className="v">Opcional</div></div>
                </div>
                <div className="on2-hv-feat">
                  <div className="ico" style={{ background: "#fff0ec", color: "#ff6b4a" }}><Icon name="support" size={18} /></div>
                  <div><div className="k">Atendimento</div><div className="v">Prioritário</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="on2-sec" id="solucoes">
        <div className="on2-shell">
          <div className="on2-sec-head center">
            <span className="on2-sec-lbl">Soluções corporativas</span>
            <h2>Conexão pensada para <span>operação real</span>.</h2>
            <p>Sem pacote genérico: analisamos endereço, quantidade de usuários, sistemas críticos e necessidade de suporte.</p>
          </div>

          <div className="on2-why-grid">
            {SERVICES.map((service) => (
              <article className="on2-why-card" key={service.title}>
                <div className="ico"><Icon name={service.icon} size={24} /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul style={{ marginTop: 18, display: "grid", gap: 10, listStyle: "none", color: "#3d5672", fontSize: 14 }}>
                  {service.features.map((feature) => (
                    <li key={feature} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <Icon name="check" size={15} /> {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="on2-sec alt">
        <div className="on2-shell">
          <div className="on2-cov-wrap">
            <div>
              <span className="on2-sec-lbl">Atendimento regional</span>
              <h2 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, lineHeight: 1.08, color: "var(--ink)", marginTop: 16 }}>
                Projetos para empresas em <span style={{ color: "var(--teal)" }}>Ipixuna, Eirunepé, Itamarati e Carauari</span>.
              </h2>
              <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.55, marginTop: 18, maxWidth: "56ch" }}>
                O time comercial valida cobertura, agenda visita técnica quando necessário e entrega uma proposta com plano,
                equipamento, prazo de instalação e condições de suporte.
              </p>
              <div className="on2-hero-actions" style={{ marginTop: 28 }}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="on2-btn on2-btn-primary">
                  Pedir análise técnica <Icon name="arrow" size={18} />
                </a>
              </div>
            </div>

            <div className="on2-bairros">
              {SEGMENTS.map((segment) => (
                <div className="on2-bairro" key={segment}>
                  <span className="dotg" />
                  {segment}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="on2-sec">
        <div className="on2-shell">
          <div className="on2-sec-head center">
            <span className="on2-sec-lbl">Dúvidas frequentes</span>
            <h2>Antes de pedir uma proposta.</h2>
          </div>
          <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gap: 14 }}>
            {FAQS.map((faq) => (
              <article className="on2-why-card" key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="on2-cta-section" id="contato">
        <div className="on2-shell">
          <div className="on2-cta-card">
            <div style={{ position: "relative", zIndex: 1 }}>
              <span className="on2-sec-lbl" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                Proposta empresarial
              </span>
              <h2 style={{ marginTop: 16 }}>Conte como sua empresa usa internet.</h2>
              <p>Respondemos pelo WhatsApp com a melhor opção para seu endereço, número de usuários e tipo de operação.</p>
            </div>
            <div className="on2-cta-form">
              <h3>Atendimento comercial</h3>
              <p style={{ color: "#3d5672", lineHeight: 1.55 }}>
                Informe cidade, bairro, quantidade de computadores/celulares e se precisa de IP fixo ou link dedicado.
              </p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="on2-btn on2-btn-primary" style={{ justifyContent: "center", marginTop: 20 }}>
                Chamar no WhatsApp <Icon name="wa" size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer whatsapp={wa} phone={phone} logo={logo} instagram={config.instagram} facebook={config.facebook} />
      <SmartFloatCTA whatsapp={wa} phone={phone} />
    </div>
  )
}
