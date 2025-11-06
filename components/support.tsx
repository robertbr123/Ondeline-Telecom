import { Headphones, AlertCircle, Zap } from "lucide-react"

export function Support() {
  const features = [
    {
      icon: Headphones,
      title: "Suporte Rápido",
      description: "Resposta em menos de 2 horas. Nossa equipe está sempre pronta para resolver seus problemas.",
    },
    {
      icon: Zap,
      title: "Instalação Técnica",
      description: "Profissionais treinados para instalar sua internet com qualidade e eficiência.",
    },
    {
      icon: AlertCircle,
      title: "100% Confiável",
      description: "Disponibilidade de 99.5% com redundância de infraestrutura em toda região.",
    },
  ]

  return (
    <section id="suporte" className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">O Melhor Suporte da Região</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Você merece um suporte rápido, eficiente e que realmente funcione
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <Icon size={28} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
