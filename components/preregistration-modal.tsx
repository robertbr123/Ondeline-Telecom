"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Phone, Check, Tag } from "lucide-react"

interface PreregistrationModalProps {
  isOpen: boolean
  onClose: () => void
  defaultCity?: string
  defaultCoupon?: string
}

export function PreregistrationModal({ isOpen, onClose, defaultCity, defaultCoupon }: PreregistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: defaultCity || "",
    coupon_code: defaultCoupon || "",
  })

  const [couponValid, setCouponValid] = useState<null | { discount_type: string; discount_value: number; description: string }>(null)
  const [couponError, setCouponError] = useState("")
  const [validatingCoupon, setValidatingCoupon] = useState(false)

  // Update city when defaultCity changes
  React.useEffect(() => {
    if (defaultCity) {
      setFormData((prev) => ({ ...prev, city: defaultCity }))
    }
  }, [defaultCity])

  React.useEffect(() => {
    if (defaultCoupon) {
      setFormData((prev) => ({ ...prev, coupon_code: defaultCoupon }))
      validateCoupon(defaultCoupon)
    }
  }, [defaultCoupon])

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '')

    if (cleaned.length === 0) return ""
    if (cleaned.length <= 2) return `(${cleaned}`
    if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}`
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
  }

  const validateCoupon = async (code: string) => {
    if (!code || code.length < 3) {
      setCouponValid(null)
      setCouponError("")
      return
    }

    setValidatingCoupon(true)
    setCouponError("")
    setCouponValid(null)

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()

      if (data.success) {
        setCouponValid(data.data)
      } else {
        setCouponError(data.error || "Cupom inválido")
      }
    } catch {
      setCouponError("Erro ao validar cupom")
    } finally {
      setValidatingCoupon(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          coupon_code: couponValid ? formData.coupon_code.toUpperCase() : undefined,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        setTimeout(() => {
          onClose()
          setSubmitted(false)
          setFormData({ name: "", email: "", phone: "", city: "", coupon_code: "" })
          setCouponValid(null)
          setCouponError("")
        }, 2000)
      } else {
        setError(data.error || "Erro ao realizar pré-cadastro")
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-xl max-w-md w-full p-6 shadow-xl animate-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Pré-cadastro</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8" aria-live="polite">
            <div className="flex justify-center mb-4">
              <Check size={48} className="text-green-500" aria-hidden="true" />
            </div>
            <p className="text-lg font-semibold text-green-400">Cadastro realizado com sucesso!</p>
            <p className="text-muted-foreground mt-2">Entraremos em contato em breve</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 cursor-pointer">
                Nome
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 cursor-pointer">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2 flex items-center gap-2 cursor-pointer">
                <Phone size={14} /> Telefone
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={15}
                aria-label="Número de telefone"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="(92) 98460-7721"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-2 cursor-pointer">
                Cidade
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecione uma cidade</option>
                <option value="Ipixuna">Ipixuna</option>
                <option value="Eirunepe">Eirunepe</option>
                <option value="Itamarati">Itamarati</option>
                <option value="Carauari">Carauari</option>
              </select>
            </div>

            <div>
              <label htmlFor="coupon_code" className="block text-sm font-medium mb-2 flex items-center gap-2 cursor-pointer">
                <Tag size={14} /> Código promocional (opcional)
              </label>
              <div className="flex gap-2">
                <input
                  id="coupon_code"
                  type="text"
                  name="coupon_code"
                  value={formData.coupon_code}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                  placeholder="Ex: VOLTA10"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={validatingCoupon || !formData.coupon_code}
                  onClick={() => validateCoupon(formData.coupon_code)}
                  className="shrink-0"
                >
                  {validatingCoupon ? "..." : "Validar"}
                </Button>
              </div>
              {couponValid && (
                <p className="text-sm text-green-500 mt-1">
                  {couponValid.discount_type === 'percentage'
                    ? `${couponValid.discount_value}% de desconto`
                    : `R$ ${couponValid.discount_value} de desconto`}
                  {' '}- {couponValid.description}
                </p>
              )}
              {couponError && (
                <p className="text-sm text-destructive mt-1">{couponError}</p>
              )}
            </div>

            {error && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
              >
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? "Enviando..." : "Realizar Pré-cadastro"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
