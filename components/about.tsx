import { Shield, Zap, Users, Award } from "lucide-react"

export function About() {
  return (
    <section id="sobre" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Sobre a Ondeline</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Conectando o Amazonas com internet de alta velocidade desde 2020
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              Nossa Missão
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              A Ondeline Telecom nasceu com o propósito de levar internet de qualidade para 
              as cidades do interior do Amazonas. Acreditamos que todo mundo merece ter acesso 
              a uma conexão rápida, estável e confiável, independentemente de onde mora.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Hoje, somos referência em Ipixuna e Eirunepe, e estamos expandindo para Itamarati e Carauari. 
              Nosso compromisso continua sendo o mesmo: oferecer o melhor serviço com o melhor suporte da região.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition">
              <Shield className="w-10 h-10 text-primary mb-3" />
              <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
              <div className="text-sm text-muted-foreground">Disponibilidade</div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border hover:border-secondary/50 transition">
              <Zap className="w-10 h-10 text-secondary mb-3" />
              <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Suporte Ativo</div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border hover:border-accent/50 transition">
              <Users className="w-10 h-10 text-accent mb-3" />
              <div className="text-3xl font-bold text-accent mb-2">+500</div>
              <div className="text-sm text-muted-foreground">Clientes Satisfeitos</div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition">
              <Award className="w-10 h-10 text-primary mb-3" />
              <div className="text-3xl font-bold text-primary mb-2">4 anos</div>
              <div className="text-sm text-muted-foreground">De Experiência</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-xl font-semibold text-foreground">Confiabilidade</h4>
            <p className="text-muted-foreground">
              Infraestrutura moderna e estável para garantir conexão sem interrupções
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <h4 className="text-xl font-semibold text-foreground">Atendimento Local</h4>
            <p className="text-muted-foreground">
              Equipe técnica própria que conhece a região e atende rapidamente
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Award className="w-8 h-8 text-accent" />
            </div>
            <h4 className="text-xl font-semibold text-foreground">Qualidade Garantida</h4>
            <p className="text-muted-foreground">
              Planos transparentes, sem letras miúdas e com o melhor custo-benefício
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}