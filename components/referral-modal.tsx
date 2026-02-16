"use client"

import React, { useState } from "react"
import { X, Users, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitAPI } from "@/hooks/useAPI"
import { CITIES } from "@/lib/constants"

interface ReferralModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [referralCode, setReferralCode] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const data = {
      referrer_name: formData.get("referrer_name") as string,
      referrer_email: formData.get("referrer_email") as string,
      referrer_phone: formData.get("referrer_phone") as string,
      referred_name: formData.get("referred_name") as string,
      referred_email: formData.get("referred_email") as string,
      referred_phone: formData.get("referred_phone") as string,
      city: formData.get("city") as string,
    }

    const result = await submitAPI("/api/referrals", "POST", data)

    if (result.success) {
      setReferralCode(result.data.referralCode)
      setStep(2)
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition"
        >
          <X size={20} />
        </button>

        {step === 1 ? (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Indique e Ganhe</h2>
                <p className="text-muted-foreground">Ganhe benefícios ao indicar amigos</p>
              </div>
            </div>

            <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <div className="flex items-start gap-3">
                <Gift className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Benefícios da Indicação:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Você ganha 1 mês grátis quando seu indicado virar cliente</li>
                    <li>• Seu amigo ganha desconto na instalação</li>
                    <li>• Sem limite de indicações</li>
                  </ul>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Seus Dados</h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Seu Nome</label>
                  <input
                    name="referrer_name"
                    type="text"
                    required
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Seu Email</label>
                  <input
                    name="referrer_email"
                    type="email"
                    required
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Seu Telefone</label>
                  <input
                    name="referrer_phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Dados do Indicado</h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Nome do Indicado</label>
                  <input
                    name="referred_name"
                    type="text"
                    required
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email do Indicado</label>
                  <input
                    name="referred_email"
                    type="email"
                    required
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefone do Indicado</label>
                  <input
                    name="referred_phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cidade</label>
                  <select
                    name="city"
                    required
                    className="w-full p-3 rounded-lg border border-border bg-background"
                  >
                    <option value="">Selecione a cidade</option>
                    {CITIES.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-lg"
              >
                {loading ? "Enviando..." : "Enviar Indicação"}
              </Button>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
              <Gift className="w-10 h-10 text-green-500" />
            </div>

            <h2 className="text-3xl font-bold mb-4">Indicação Enviada!</h2>
            <p className="text-muted-foreground mb-6">
              Obrigado por indicar a Ondeline! Entraremos em contato com seu indicado.
            </p>

            <div className="p-4 rounded-lg bg-muted/50 border border-border mb-6">
              <p className="text-sm text-muted-foreground mb-2">Seu código de indicação:</p>
              <p className="text-2xl font-bold text-primary">{referralCode}</p>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Você receberá um email de confirmação. Quando a indicação virar cliente,
              você ganhará 1 mês grátis!
            </p>

            <Button
              onClick={() => {
                setStep(1)
                onClose()
              }}
              className="w-full"
            >
              Fechar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
