"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react"
import { PreregistrationModal } from "./preregistration-modal"

export function CoverageChecker() {
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<"covered" | "coming-soon" | "not-covered" | null>(null)
  const [city, setCity] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const cities = {
    "Ipixuna": { status: "covered", estimatedDate: null },
    "Eirunepe": { status: "covered", estimatedDate: null },
    "Itamarati": { status: "coming-soon", estimatedDate: "Março 2026" },
    "Carauari": { status: "coming-soon", estimatedDate: "Junho 2026" },
  }

  const checkCoverage = async () => {
    if (!address.trim()) return

    setLoading(true)
    setResult(null)
    setCity("")

    // Simular verificação (em produção, seria uma API real)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const addressLower = address.toLowerCase()
    let foundCity = null

    // Verificar cidade no endereço
    for (const [cityName, data] of Object.entries(cities)) {
      if (addressLower.includes(cityName.toLowerCase())) {
        foundCity = cityName
        setCity(cityName)
        break
      }
    }

    if (foundCity) {
      setResult(cities[foundCity as keyof typeof cities].status as any)
    } else {
      // Se não encontrou cidade, assume "em breve"
      setResult("coming-soon")
    }

    setLoading(false)
  }

  const handlePreRegister = () => {
    setIsModalOpen(true)
  }

  const getResultIcon = () => {
    switch (result) {
      case "covered":
        return <CheckCircle className="w-16 h-16 text-green-500" />
      case "coming-soon":
        return <Clock className="w-16 h-16 text-yellow-500" />
      case "not-covered":
        return <XCircle className="w-16 h-16 text-red-500" />
      default:
        return null
    }
  }

  const getResultText = () => {
    switch (result) {
      case "covered":
        return "Excelente! Sua região já está coberta"
      case "coming-soon":
        const cityData = cities[city as keyof typeof cities]
        return cityData?.estimatedDate 
          ? `Chegaremos em ${city} em breve! Previsão: ${cityData.estimatedDate}`
          : "Chegaremos em breve!"
      case "not-covered":
        return "Ainda não cobrimos esta região"
      default:
        return ""
    }
  }

  const getResultDescription = () => {
    switch (result) {
      case "covered":
        return "Você pode contratar um plano agora mesmo e ter internet de alta velocidade em até 3 dias úteis."
      case "coming-soon":
        return "Deixe seu email para ser avisado quando chegarmos na sua região. Você terá acesso a ofertas exclusivas!"
      case "not-covered":
        return "Mas estamos nos expandindo! Deixe seu email e entraremos em contato quando chegarmos."
      default:
        return ""
    }
  }

  return (
    <>
      <PreregistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <section id="cobertura" className="py-20 px-4 bg-gradient-to-b from-background to-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-4">
              <MapPin size={16} className="text-primary" />
              <span className="text-primary font-semibold text-sm">Verificador de Cobertura</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Verifique se sua região é coberta
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Digite seu endereço para verificar se já temos internet de alta velocidade na sua região
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-card/50 border border-border rounded-2xl p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <label htmlFor="address-input" className="sr-only">
                  Endereço para verificação de cobertura
                </label>
                <input
                  id="address-input"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Digite seu endereço (ex: Rua X, Bairro, Cidade)"
                  className="flex-1 px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  onKeyPress={(e) => e.key === "Enter" && checkCoverage()}
                />
                <Button
                  onClick={checkCoverage}
                  disabled={loading || !address.trim()}
                  className="px-8 py-3 bg-primary hover:bg-primary/90 font-semibold min-w-[140px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    "Verificar"
                  )}
                </Button>
              </div>

              {result && (
                <div className="mt-8 p-6 rounded-xl bg-background/50 border border-border">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      {getResultIcon()}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2">{getResultText()}</h3>
                      <p className="text-muted-foreground mb-4">{getResultDescription()}</p>
                      {(result === "covered") && (
                        <Button
                          onClick={() => setIsModalOpen(true)}
                          className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                        >
                          Contratar Agora
                        </Button>
                      )}
                      {(result === "coming-soon" || result === "not-covered") && (
                        <Button
                          onClick={handlePreRegister}
                          variant="outline"
                          className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10"
                        >
                          Receber Aviso
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-primary mb-1">Ipixuna</div>
                  <div className="text-sm text-green-500 font-semibold">✓ Coberto</div>
                </div>
                <div className="p-4 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-primary mb-1">Eirunepe</div>
                  <div className="text-sm text-green-500 font-semibold">✓ Coberto</div>
                </div>
                <div className="p-4 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-primary mb-1">Itamarati</div>
                  <div className="text-sm text-yellow-500 font-semibold">Março 2026</div>
                </div>
                <div className="p-4 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-primary mb-1">Carauari</div>
                  <div className="text-sm text-yellow-500 font-semibold">Junho 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}