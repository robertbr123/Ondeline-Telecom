import { Button } from "@/components/ui/button"
import { Check, Zap } from "lucide-react"

export function Plans() {
  const plans = [
    {
      name: "Inicial",
      speed: "20 MB",
      price: "R$ 100",
      description: "Perfeito para uso residencial básico",
      features: ["20 MB de velocidade", "Wi-Fi grátis", "Suporte 24/7", "Roteador incluído"],
    },
    {
      name: "Profissional",
      speed: "50 MB",
      price: "R$ 130",
      description: "Ideal para trabalho e múltiplos dispositivos",
      features: [
        "50 MB de velocidade",
        "Wi-Fi de longo alcance",
        "Suporte prioritário",
        "Roteador mesh",
        "IP fixo opcional",
      ],
      highlighted: true,
    },
    {
      name: "Premium",
      speed: "80 MB",
      price: "R$ 150",
      description: "Máximo desempenho para sua casa ou escritório",
      features: [
        "80 MB de velocidade",
        "Wi-Fi 6 Mesh",
        "Suporte VIP",
        "IP fixo incluído",
        "Garantia expandida",
        "Backup de internet",
      ],
    },
    {
      name: "Empresarial",
      speed: "Customizado",
      price: "Sob Orçamento",
      description: "Soluções personalizadas para sua empresa",
      features: [
        "Velocidade sob medida",
        "SLA garantido",
        "Técnico dedicado",
        "Conexão redundante",
        "Monitoramento 24/7",
      ],
    },
  ]

  return (
    <section id="planos" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Planos que se Encaixam no seu Orçamento</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano perfeito para suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border transition-all duration-300 p-6 ${
                plan.highlighted
                  ? "border-primary bg-gradient-to-br from-primary/15 to-secondary/10 ring-2 ring-primary lg:scale-105"
                  : "border-border bg-card/50 hover:border-primary/50 hover:bg-card/80"
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4 inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="text-sm text-secondary font-semibold mt-2 flex items-center gap-1">
                  <Zap size={16} /> {plan.speed}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={20} className="text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlighted
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                }`}
              >
                Contratar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
