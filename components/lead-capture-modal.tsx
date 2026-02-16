"use client"

import React, { useEffect, useState } from "react"
import { X, Send, MapPin, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

export function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Verificar se o modal já foi mostrado
    const hasShownModal = localStorage.getItem("leadCaptureModalShown")
    const hasSubmittedLead = localStorage.getItem("hasSubmittedLead")

    if (!hasShownModal && !hasSubmittedLead) {
      // Mostrar modal após 5 segundos
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    
    if (cleaned.length === 0) return ""
    if (cleaned.length <= 2) return `(${cleaned}`
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}`
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("leadCaptureModalShown", "true")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: "nao_informado@lead.com", // Email padrão já que não é obrigatório
          phone: formData.phone,
          city: formData.city,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        localStorage.setItem("hasSubmittedLead", "true")
        
        // NÃO fechar o modal após sucesso - fica na mesma tela
      } else {
        setError(data.error || "Erro ao enviar dados")
      }
    } catch (error) {
      setError("Erro ao conectar com o servidor")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-border relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary via-secondary to-primary p-6 text-white relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 hover:bg-white/20 rounded-full p-1 transition"
                >
                  <X size={20} />
                </button>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                    <Send size={24} />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">Bem-vindo!</h2>
                  <p className="text-white/90 text-sm">
                    Receba ofertas exclusivas da Ondeline
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                      <Send size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Obrigado!
                    </h3>
                    <p className="text-muted-foreground">
                      Em breve entraremos em contato com você
                    </p>
                    <Button
                      onClick={handleClose}
                      className="mt-4 bg-gradient-to-r from-primary via-secondary to-primary hover:opacity-90 transition font-semibold"
                    >
                      Fechar
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User size={16} className="text-primary" />
                        Nome Completo
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Phone size={16} className="text-secondary" />
                        Telefone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(92) 99999-9999"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        maxLength={15}
                        aria-label="Número de telefone"
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MapPin size={16} className="text-accent" />
                        Cidade
                      </label>
                      <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full h-11 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Selecione sua cidade</option>
                        <option value="Ipixuna">Ipixuna</option>
                        <option value="Eirunepe">Eirunepe</option>
                        <option value="Itamarati">Itamarati</option>
                        <option value="Carauari">Carauari</option>
                        <option value="Outra">Outra cidade</option>
                      </select>
                    </div>

                    {error && (
                      <div
                        role="alert"
                        className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                      >
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-primary via-secondary to-primary hover:opacity-90 transition font-semibold"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Quero Receber Ofertas
                          <Send size={18} />
                        </span>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Ao continuar, você concorda em receber comunicações da Ondeline
                    </p>
                  </form>
                )}
              </div>

              {/* Footer */}
              <div className="bg-muted/30 px-6 py-3 border-t border-border">
                <p className="text-xs text-center text-muted-foreground">
                  <span className="font-medium">🔒 Seus dados estão seguros</span>
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}