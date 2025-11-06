import { MapPin } from "lucide-react"

export function Coverage() {
  const cities = [
    { name: "Ipixuna", status: "ativo", emoji: "✓" },
    { name: "Eirunepe", status: "ativo", emoji: "✓" },
    { name: "Itamarati", status: "em-breve", emoji: "🔜" },
    { name: "Carauari", status: "em-breve", emoji: "🔜" },
  ]

  return (
    <section id="cobertura" className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Cobertura no Amazonas</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expandindo nossa rede para levar internet de qualidade a mais municípios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cities.map((city) => (
            <div
              key={city.name}
              className={`p-8 rounded-xl border-2 text-center transition-all ${
                city.status === "ativo" ? "border-secondary bg-secondary/10" : "border-primary/30 bg-primary/5"
              }`}
            >
              <div className="text-4xl mb-2">{city.emoji}</div>
              <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
              <p className="text-sm text-muted-foreground">
                {city.status === "ativo" ? "Serviço Disponível" : "Em Breve"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-xl bg-card border border-border">
          <div className="flex items-start gap-4">
            <MapPin className="text-primary flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-lg font-bold mb-2">Não vê sua cidade?</h3>
              <p className="text-muted-foreground">
                Estamos expandindo constantemente. Deixe seu interesse registrado e entraremos em contato assim que
                chegarmos em sua região.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
