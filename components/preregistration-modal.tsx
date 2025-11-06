"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface PreregistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PreregistrationModal({ isOpen, onClose }: PreregistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Pré-cadastro enviado:", formData)
    setSubmitted(true)
    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setFormData({ name: "", email: "", phone: "", city: "" })
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-xl max-w-md w-full p-6 shadow-xl animate-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Pré-cadastro</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition">
            <X size={24} />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-lg font-semibold text-green-400">Cadastro realizado com sucesso!</p>
            <p className="text-muted-foreground mt-2">Entraremos em contato em breve</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome</label>
              <input
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
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
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
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="(92) 98460-7721"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Cidade</label>
              <select
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

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Realizar Pré-cadastro
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
