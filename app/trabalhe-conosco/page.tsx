"use client"

import React, { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Users, Target, Zap, Heart, MapPin, Mail, Phone, Briefcase } from "lucide-react"

export default function TrabalheConoscoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    cargo: "",
    experiencia: "",
    mensagem: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      cidade: "",
      cargo: "",
      experiencia: "",
      mensagem: ""
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (submitted) {
    return (
      <main className="w-full min-h-screen">
        <Header />
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-5xl">✓</span>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-primary">Candidatura Enviada!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Obrigado pelo seu interesse em fazer parte da equipe Ondeline. 
              Recebemos suas informações e entraremos em contato em breve.
            </p>
            <Button 
              onClick={() => setSubmitted(false)}
              className="bg-primary hover:bg-primary/90"
            >
              Enviar Nova Candidatura
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="w-full min-h-screen">
      <Header />
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Trabalhe Conosco</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Faça parte da equipe que está conectando o Amazonas. Junte-se a nós e construa uma carreira em uma empresa em crescimento.
            </p>
          </div>

          {/* Por que trabalhar conosco */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-foreground">Equipe Unida</h3>
              <p className="text-sm text-muted-foreground">
                Ambiente colaborativo e acolhedor
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition">
              <Target className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-foreground">Crescimento</h3>
              <p className="text-sm text-muted-foreground">
                Oportunidades de desenvolvimento profissional
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition">
              <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-foreground">Inovação</h3>
              <p className="text-sm text-muted-foreground">
                Trabalhe com tecnologia de ponta
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-foreground">Impacto</h3>
              <p className="text-sm text-muted-foreground">
                Conecte comunidades ao mundo
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulário */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                Envie sua Candidatura
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-foreground mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                      placeholder="(92) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cidade" className="block text-sm font-medium text-foreground mb-2">
                    Cidade *
                  </label>
                  <select
                    id="cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  >
                    <option value="">Selecione a cidade</option>
                    <option value="ipixuna">Ipixuna</option>
                    <option value="eirunepe">Eirunepe</option>
                    <option value="itamarati">Itamarati</option>
                    <option value="carauari">Carauari</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cargo" className="block text-sm font-medium text-foreground mb-2">
                    Cargo de Interesse *
                  </label>
                  <select
                    id="cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  >
                    <option value="">Selecione o cargo</option>
                    <option value="tecnico">Técnico de Instalação</option>
                    <option value="suporte">Analista de Suporte</option>
                    <option value="vendas">Vendedor</option>
                    <option value="financeiro">Assistente Financeiro</option>
                    <option value="marketing">Auxiliar de Marketing</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="experiencia" className="block text-sm font-medium text-foreground mb-2">
                    Experiência Profissional *
                  </label>
                  <select
                    id="experiencia"
                    name="experiencia"
                    value={formData.experiencia}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  >
                    <option value="">Selecione sua experiência</option>
                    <option value="estagiario">Estagiário</option>
                    <option value="junior">Júnior (1-2 anos)</option>
                    <option value="pleno">Pleno (3-5 anos)</option>
                    <option value="senior">Sênior (5+ anos)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-foreground mb-2">
                    Conte sobre você *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                    placeholder="Conte um pouco sobre sua experiência e por que quer trabalhar na Ondeline..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-lg font-semibold"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Candidatura"}
                </Button>
              </form>
            </div>

            {/* Informações Adicionais */}
            <div className="space-y-6">
              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Benefícios</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-muted-foreground">Salário competitivo compatível com o mercado</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-muted-foreground">Vale-alimentação e vale-transporte</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-muted-foreground">Plano de saúde e odontológico</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-muted-foreground">PLR (Participação nos Lucros)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-muted-foreground">Internet gratuita em casa</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-muted-foreground">Cursos e capacitações</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Nossa Cultura</h3>
                <p className="text-muted-foreground mb-4">
                  Valorizamos pessoas que são proativas, criativas e que querem fazer a diferença na comunidade. 
                  Buscamos profissionais que compartilham dos nossos valores:
                </p>
                <ul className="space-y-2">
                  <li className="text-muted-foreground">• Compromisso com a qualidade</li>
                  <li className="text-muted-foreground">• Respeito ao cliente e colegas</li>
                  <li className="text-muted-foreground">• Inovação contínua</li>
                  <li className="text-muted-foreground">• Trabalho em equipe</li>
                  <li className="text-muted-foreground">• Ética e transparência</li>
                </ul>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Entre em Contato</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">
                      Ipixuna, Eirunepe, Itamarati e Carauari - AM
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">(92) 98460-7721</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">rh@ondeline.com.br</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}