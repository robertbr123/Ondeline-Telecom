import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  Server, 
  Cloud, 
  Shield, 
  Zap, 
  Database, 
  Globe, 
  Users, 
  Headphones,
  CheckCircle,
  ArrowRight,
  Building2,
  Clock,
  TrendingUp,
  FileText,
  Phone
} from "lucide-react"

export default function EmpresasPage() {
  const services = [
    {
      icon: Server,
      title: "Servidores Dedicados",
      description: "Servidores físicos dedicados para sua empresa com performance máxima e controle total.",
      features: [
        "Hardware de ponta (Intel Xeon, AMD EPYC)",
        "Até 128GB de RAM",
        "SSD NVMe de alta performance",
        "Conexão de até 10Gbps",
        "IP dedicado",
        "Acesso remoto completo"
      ],
      price: "A partir de R$ 899/mês"
    },
    {
      icon: Cloud,
      title: "Cloud Computing",
      description: "Infraestrutura em nuvem escalável para crescer junto com seu negócio.",
      features: [
        "Servidores virtuais (VPS)",
        "Escalabilidade elástica",
        "Backup automatizado diário",
        "Balanceamento de carga",
        "SLA de 99.9%",
        "Pague apenas o que usar"
      ],
      price: "A partir de R$ 299/mês"
    },
    {
      icon: Database,
      title: "Hospedagem e Banco de Dados",
      description: "Soluções completas de hospedagem com bancos de dados gerenciados.",
      features: [
        "MySQL, PostgreSQL, MongoDB",
        "Criação automática de backups",
        "Alta disponibilidade",
        "Suporte 24/7 especializado",
        "Otimização de performance",
        "Replicação de dados"
      ],
      price: "A partir de R$ 199/mês"
    },
    {
      icon: Globe,
      title: "CDN e Hosting",
      description: "Distribuição global de conteúdo para máxima velocidade em todo o Brasil.",
      features: [
        "CDN global com 50+ PoPs",
        "Cache inteligente",
        "SSL gratuito",
        "DDoS Protection",
        "Web Application Firewall",
        "Analytics em tempo real"
      ],
      price: "A partir de R$ 149/mês"
    },
    {
      icon: Shield,
      title: "Segurança Avançada",
      description: "Proteção completa para sua infraestrutura e dados empresariais.",
      features: [
        "Firewall gerenciado",
        "Monitoramento 24/7",
        "Proteção contra ataques DDoS",
        "SSL/TLS Avançado",
        "Auditoria de segurança",
        "Compliance LGPD"
      ],
      price: "A partir de R$ 399/mês"
    },
    {
      icon: Zap,
      title: "Internet Corporativa Dedicada",
      description: "Conexão de internet dedicada com garantia de velocidade e estabilidade.",
      features: [
        "SLA garantido de 99.9%",
        "IP fixo dedicado",
        "Suporte técnico prioritário",
        "Monitoramento proativo",
        "Banda simétrica",
        "Instalação em 48h"
      ],
      price: "Sob consulta"
    }
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Escalabilidade",
      description: "Cresça sem limites. Infraestrutura que acompanha sua evolução"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Proteção avançada com firewalls, monitoramento e backups automáticos"
    },
    {
      icon: Clock,
      title: "Disponibilidade 99.9%",
      description: "SLA garantido com redundância e backup de emergência"
    },
    {
      icon: Headphones,
      title: "Suporte Especializado",
      description: "Equipe técnica dedicada 24/7 para resolver qualquer problema"
    },
    {
      icon: Users,
      title: "Consultoria Técnica",
      description: "Especialistas para ajudar na arquitetura e otimização"
    },
    {
      icon: Globe,
      title: "Conexão Nacional",
      description: "Infraestrutura espalhada pelo Brasil com baixa latência"
    }
  ]

  const plans = [
    {
      name: "Starter",
      description: "Para pequenas empresas iniciando no digital",
      price: "R$ 299",
      period: "/mês",
      features: [
        "1 vCPU",
        "2GB RAM",
        "40GB SSD",
        "Transferência: 2TB",
        "1 IP fixo",
        "Backup semanal",
        "Suporte por email"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      description: "Para empresas em crescimento",
      price: "R$ 599",
      period: "/mês",
      features: [
        "4 vCPU",
        "8GB RAM",
        "160GB SSD",
        "Transferência: 5TB",
        "2 IPs fixos",
        "Backup diário",
        "Suporte 24/7 via chat",
        "CDN básico"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      description: "Para grandes operações",
      price: "R$ 1.499",
      period: "/mês",
      features: [
        "8 vCPU",
        "32GB RAM",
        "500GB SSD",
        "Transferência: 20TB",
        "5 IPs fixos",
        "Backup a cada 6h",
        "Suporte dedicado",
        "CDN completo",
        "Load Balancer",
        "Consultoria técnica"
      ],
      highlighted: false
    }
  ]

  const useCases = [
    {
      title: "E-commerce",
      description: "Infraestrutura robusta para lojas virtuais com picos de tráfego",
      services: ["Cloud Computing", "CDN", "Load Balancer"]
    },
    {
      title: "SaaS e Apps",
      description: "Servidores para aplicações web e mobile com alta disponibilidade",
      services: ["VPS Dedicado", "Banco de Dados", "SSL Avançado"]
    },
    {
      title: "Governo e Setor Público",
      description: "Soluções compliant com requisitos de segurança e LGPD",
      services: ["Servidor Dedicado", "Segurança Avançada", "Auditoria"]
    },
    {
      title: "Saúde e Educação",
      description: "Sistemas críticos com redundância e backup garantido",
      services: ["Backup Automatizado", "Alta Disponibilidade", "VPN Corporativa"]
    },
    {
      title: "Agências de Marketing",
      description: "Hosting múltiplo para clientes com performance otimizada",
      services: ["Multi-tenancy", "CDN Global", "Analytics"]
    },
    {
      title: "Indústria 4.0",
      description: "IoT e automação com processamento em nuvem de baixa latência",
      services: ["Edge Computing", "Cloud Computing", "VPN Corporativa"]
    }
  ]

  const testimonials = [
    {
      name: "Ricardo Almeida",
      company: "Tech Solutions Eirunepe",
      role: "CEO",
      text: "A Ondeline transformou nossa infraestrutura. Migramos tudo para cloud e reduzimos custos em 40%. O suporte técnico é excepcional."
    },
    {
      name: "Ana Paula Souza",
      company: "Loja Virtual Ipixuna",
      role: "Diretora",
      text: "Nossa e-commerce cresceu 300% e o servidor da Ondeline aguentou tudo sem cair. O CDN deixou o site super rápido."
    },
    {
      name: "Carlos Mendes",
      company: "Clínica Saúde Total",
      role: "Gerente de TI",
      text: "Segurança era nossa maior preocupação. Com a solução da Ondeline, estamos 100% compliant e com backups automatizados."
    }
  ]

  const faqs = [
    {
      q: "Qual é o prazo de ativação?",
      a: "Servidores virtuais (VPS) são ativados instantaneamente. Servidores dedicados podem levar 24-48h dependendo da configuração."
    },
    {
      q: "Vocês oferecem SLA?",
      a: "Sim! Oferecemos SLA de 99.9% para todos os serviços. Caso não cumpramos, você recebe créditos automaticamente."
    },
    {
      q: "Como funciona o suporte?",
      a: "Oferecemos suporte 24/7 via chat, email e telefone para planos Professional e Enterprise. O plano Starter tem suporte por email."
    },
    {
      q: "Posso migrar minha infraestrutura atual?",
      a: "Sim! Nossa equipe de migração ajuda a transferir todos os seus dados, servidores e aplicações sem interrupção do serviço."
    },
    {
      q: "Como funciona o backup?",
      a: "Backups automáticos são feitos diariamente (Professional) ou a cada 6 horas (Enterprise). Também oferecemos backup manual sob demanda."
    },
    {
      q: "Vocês estão compliant com LGPD?",
      a: "Sim! Todos os nossos serviços seguem as melhores práticas de segurança e conformidade com a Lei Geral de Proteção de Dados."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 w-fit">
            <Building2 size={16} />
            Soluções Empresariais
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Servidores e <span className="text-primary">Cloud Computing</span> para Empresas
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
            Infraestrutura robusta, segura e escalável para impulsionar seu negócio. 
            Servidores dedicados, cloud computing e soluções corporativas com SLA garantido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="h-14 px-8 text-lg">
              <Globe className="mr-2" size={20} />
              Falar com Especialista
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg">
              <FileText className="mr-2" size={20} />
              Baixar Catálogo
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluções completas de infraestrutura para empresas de todos os tamanhos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-border">
                  <span className="text-lg font-bold text-primary">{service.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Por Que Escolher a Ondeline?</h2>
            <p className="text-xl text-muted-foreground">
              Diferenciais que fazem a diferença para seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Planos Empresariais</h2>
            <p className="text-xl text-muted-foreground">
              Escolha o plano ideal para o tamanho da sua empresa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-card border rounded-xl p-8 ${
                  plan.highlighted 
                    ? 'border-primary shadow-xl scale-105' 
                    : 'border-border'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  Começar Agora
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Precisa de uma solução personalizada para sua empresa?
            </p>
            <Button size="lg" variant="outline">
              <Users className="mr-2" size={20} />
              Falar com Consultor
            </Button>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Casos de Uso</h2>
            <p className="text-xl text-muted-foreground">
              Soluções adaptadas para diferentes segmentos de mercado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground mb-4">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.services.map((service, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">O Que Dizem Nossos Clientes</h2>
            <p className="text-xl text-muted-foreground">
              Empresas que confiam na Ondeline para sua infraestrutura
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-primary-foreground">
            <h2 className="text-4xl font-bold mb-4">Pronto para Transformar sua Infraestrutura?</h2>
            <p className="text-xl mb-8 opacity-90">
              Converse com nossos especialistas e descubra a solução ideal para sua empresa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-8 text-lg bg-background text-foreground hover:bg-background/90">
                <Globe className="mr-2" size={20} />
                Falar com Especialista
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                <Phone className="mr-2" size={20} />
                (92) 98460-7721
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}