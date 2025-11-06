"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CoveragePage() {
  const [cep, setCep] = useState("")
  const [coverageStatus, setCoverageStatus] = useState<"idle" | "checking" | "active" | "coming" | "unavailable">(
    "idle",
  )
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const cities = [
    { name: "Ipixuna", cep: "69890-000", status: "active" },
    { name: "Eirunepe", cep: "69880-000", status: "active" },
    { name: "Carauari", cep: "69500-000", status: "coming" },
    { name: "Itamarati", cep: "69510-000", status: "coming" },
  ]

  const formatCEP = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "").slice(0, 8)
    if (cleanedValue.length <= 5) {
      return cleanedValue
    }
    return `${cleanedValue.slice(0, 5)}-${cleanedValue.slice(5)}`
  }

  const handleCheckCoverage = () => {
    const cleanCep = cep.replace(/\D/g, "")
    if (!cleanCep.trim()) return

    setCoverageStatus("checking")

    setTimeout(() => {
      const found = cities.find((city) => city.cep.replace(/\D/g, "") === cleanCep)

      if (found) {
        setSelectedCity(found.name)
        setCoverageStatus(found.status as "active" | "coming")
      } else {
        setCoverageStatus("unavailable")
        setSelectedCity(null)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Seção de Verificação de Cobertura */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-border">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Verifique Nossa Cobertura
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Digite seu CEP para verificar se a Ondeline atende sua região
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Digite seu CEP (ex: 69890-000)"
                  value={cep}
                  onChange={(e) => {
                    setCep(formatCEP(e.target.value))
                    setCoverageStatus("idle")
                  }}
                  className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength="9"
                />
                <Button
                  onClick={handleCheckCoverage}
                  disabled={cep.length < 9 || coverageStatus === "checking"}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  {coverageStatus === "checking" ? "Verificando..." : "Verificar"}
                </Button>
              </div>

              {/* Resultado da busca */}
              {coverageStatus !== "idle" && (
                <div
                  className={`p-6 rounded-lg border-l-4 ${
                    coverageStatus === "active"
                      ? "bg-emerald-500/10 border-emerald-500"
                      : coverageStatus === "coming"
                        ? "bg-orange-500/10 border-orange-500"
                        : "bg-red-500/10 border-red-500"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {coverageStatus === "active" && <CheckCircle size={24} className="text-emerald-500" />}
                      {coverageStatus === "coming" && <AlertCircle size={24} className="text-orange-500" />}
                      {coverageStatus === "unavailable" && <AlertCircle size={24} className="text-red-500" />}
                    </div>
                    <div className="flex-1">
                      {coverageStatus === "active" && (
                        <div>
                          <p className="font-semibold text-emerald-700 dark:text-emerald-300 text-lg mb-2">
                            ✓ Cobertura Confirmada em {selectedCity}!
                          </p>
                          <p className="text-emerald-600 dark:text-emerald-400 mb-4">
                            Perfeito! Você já pode contratar nossos serviços de internet de alta velocidade.
                          </p>
                          <a
                            href={`https://wa.me/5592984607721?text=Olá! Tenho interesse em contratar a Ondeline em ${selectedCity} - CEP ${cep}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                              Agendar Instalação via WhatsApp
                            </Button>
                          </a>
                        </div>
                      )}
                      {coverageStatus === "coming" && (
                        <div>
                          <p className="font-semibold text-orange-700 dark:text-orange-300 text-lg mb-2">
                            🔜 {selectedCity} - Em Breve!
                          </p>
                          <p className="text-orange-600 dark:text-orange-400 mb-4">
                            Estamos expandindo para sua região. Reserve já seu lugar na fila para quando chegarmos!
                          </p>
                          <a
                            href={`https://wa.me/5592984607721?text=Olá! Gostaria de reservar a internet da Ondeline em ${selectedCity} - CEP ${cep}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white">Reservar Meu Lugar</Button>
                          </a>
                        </div>
                      )}
                      {coverageStatus === "unavailable" && (
                        <div>
                          <p className="font-semibold text-red-700 dark:text-red-300 text-lg mb-2">
                            CEP não encontrado em nossa cobertura
                          </p>
                          <p className="text-red-600 dark:text-red-400">
                            No momento, não temos cobertura no CEP {cep}. Mas estamos em expansão! Entre em contato para
                            saber quando chegaremos à sua região.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mapa interativo com cidades */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Nossas Cidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cities.map((city) => (
                <div
                  key={city.name}
                  className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                    city.status === "active"
                      ? "bg-emerald-500/10 border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
                      : "bg-orange-500/10 border-orange-500 hover:shadow-lg hover:shadow-orange-500/20"
                  }`}
                  onClick={() => setSelectedCity(selectedCity === city.name ? null : city.name)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground">{city.name}</h3>
                    <span className={`text-2xl ${city.status === "active" ? "text-emerald-500" : "text-orange-500"}`}>
                      {city.status === "active" ? "✓" : "🔜"}
                    </span>
                  </div>
                  <p
                    className={`text-sm font-semibold mb-3 ${
                      city.status === "active"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-orange-600 dark:text-orange-400"
                    }`}
                  >
                    {city.status === "active" ? "Cobertura Ativa" : "Em Breve"}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">CEP: {city.cep}...</p>

                  {city.status === "active" && (
                    <a
                      href={`https://wa.me/5592984607721?text=Olá! Tenho interesse em contratar a Ondeline em ${city.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-primary hover:bg-primary/90 text-sm" size="sm">
                        Contratar em {city.name}
                      </Button>
                    </a>
                  )}
                  {city.status === "coming" && (
                    <a
                      href={`https://wa.me/5592984607721?text=Olá! Gostaria de reservar a internet da Ondeline para ${city.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-orange-600 hover:bg-orange-700 text-sm" size="sm">
                        Reservar para {city.name}
                      </Button>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Informações */}
          <div className="bg-card rounded-lg p-8 border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-6">Perguntas Frequentes Sobre Cobertura</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Como sei se tenho cobertura?</h3>
                <p className="text-muted-foreground">
                  Digite seu CEP no campo acima. Se sua região tiver cobertura, você verá o status imediatamente.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">E se meu CEP estiver "Em Breve"?</h3>
                <p className="text-muted-foreground">
                  Ótimo! Estamos expandindo para sua região. Clique em "Reservar" e deixe seus contatos. Entraremos em
                  contato quando chegarmos lá.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Qual é a velocidade padrão?</h3>
                <p className="text-muted-foreground">
                  Oferecemos planos de 20MB, 50MB, 80MB e planos customizados. Fale com nosso time sobre qual melhor se
                  adequa às suas necessidades.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Vocês oferecem suporte técnico?</h3>
                <p className="text-muted-foreground">
                  Sim! Temos suporte 24/7 em português. Somos reconhecidos pelo suporte mais rápido da região.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
