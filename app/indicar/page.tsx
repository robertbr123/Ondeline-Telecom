"use client"

import { Header } from "@/components/header"
import { ReferralModal } from "@/components/referral-modal"
import { Footer } from "@/components/footer"
import { Gift, Users, TrendingUp, Zap, CheckCircle, Share2, Crown } from "lucide-react"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"

export default function IndicarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const benefits = [
    {
      icon: Gift,
      title: "1 Mês Grátis para Você",
      description: "Ganhe 1 mês de internet grátis toda vez que um amigo se tornar cliente da Ondeline"
    },
    {
      icon: Zap,
      title: "Desconto para Seu Amigo",
      description: "Seu indicado recebe R$ 50 de desconto na instalação e primeiro mês"
    },
    {
      icon: Users,
      title: "Sem Limite de Indicações",
      description: "Quanto mais amigos indicar, mais você ganha. Sem restrições!"
    },
    {
      icon: TrendingUp,
      title: "Bônus Cumulativo",
      description: "5 indicações = 2 meses grátis. 10 indicações = 5 meses grátis!"
    }
  ]

  const steps = [
    {
      step: "1",
      title: "Compartilhe seu Código",
      description: "Use seu código de indicação único ou envie link personalizado para amigos"
    },
    {
      step: "2",
      title: "Amigo se Cadastra",
      description: "Seu amigo usa seu código ao contratar qualquer plano Ondeline"
    },
    {
      step: "3",
      title: "Ambos Ganham",
      description: "Amigo recebe desconto e você ganha 1 mês grátis automaticamente"
    }
  ]

  const leaderboard = [
    { name: "Maria Silva", city: "Eirunepe", referrals: 12, reward: "6 meses grátis" },
    { name: "João Santos", city: "Ipixuna", referrals: 8, reward: "4 meses grátis" },
    { name: "Ana Costa", city: "Itamarati", referrals: 6, reward: "3 meses grátis" },
    { name: "Pedro Lima", city: "Carauari", referrals: 4, reward: "2 meses grátis" },
  ]

  const waysToShare = [
    {
      icon: Share2,
      title: "Link Personalizado",
      description: "Gere um link único e compartilhe no WhatsApp, email ou redes sociais"
    },
    {
      icon: Gift,
      title: "QR Code",
      description: "Use o QR Code para compartilhar em panfletos ou impressos"
    },
    {
      icon: Crown,
      title: "Cartão Digital",
      description: "Tenha seu cartão de indicação sempre à mão no celular"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Gift size={16} />
            Programa de Indicações Oficial
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Indique e <span className="text-primary">Ganhe Mês Grátis</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Conecte seus amigos e familiares à melhor internet do Amazonas e ganhe benefícios exclusivos.
            Quanto mais você indica, mais você ganha!
          </p>
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="h-14 px-8 text-lg"
          >
            <Gift className="mr-2" size={20} />
            Indicar Agora e Ganhar
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Indicações Realizadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">R$ 25k+</div>
              <div className="text-muted-foreground">Em Benefícios Distribuídos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfação dos Indicados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Indicadores Ativos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Por Que Indicar a Ondeline?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Benefícios incríveis para você e para quem você indica
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Como Funciona?</h2>
            <p className="text-xl text-muted-foreground">
              Em apenas 3 passos simples você já pode começar a ganhar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card border border-border rounded-xl p-8 h-full">
                  <div className="text-6xl font-bold text-primary/20 mb-4">{step.step}</div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle size={16} className="text-primary-foreground" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Share */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Formas de Compartilhar</h2>
            <p className="text-xl text-muted-foreground">
              Escolha a melhor forma para você compartilhar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {waysToShare.map((way, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <way.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{way.title}</h3>
                <p className="text-muted-foreground">{way.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🏆 Top Indicadores</h2>
            <p className="text-xl text-muted-foreground">
              Veja quem está ganhando mais com o programa
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 bg-primary/10 font-semibold">
              <div>Posição</div>
              <div>Nome</div>
              <div>Cidade</div>
              <div className="text-right">Indicações</div>
            </div>
            {leaderboard.map((person, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-4 border-t border-border items-center hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  {index === 0 && <Crown className="text-yellow-500" size={20} />}
                  {index === 1 && <Crown className="text-gray-400" size={20} />}
                  {index === 2 && <Crown className="text-amber-600" size={20} />}
                  <span className="font-semibold">#{index + 1}</span>
                </div>
                <div className="font-medium">{person.name}</div>
                <div className="text-muted-foreground">{person.city}</div>
                <div className="text-right">
                  <div className="font-bold text-primary">{person.referrals}</div>
                  <div className="text-xs text-muted-foreground">{person.reward}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Quer aparecer no ranking? Comece a indicar agora!
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Users className="mr-2" size={18} />
              Fazer Parte do Ranking
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-center text-primary-foreground">
            <h2 className="text-4xl font-bold mb-4">Pronto para Começar?</h2>
            <p className="text-xl mb-8 opacity-90">
              Indique seus amigos agora e comece a acumular benefícios!
            </p>
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="h-14 px-8 text-lg bg-background text-foreground hover:bg-background/90"
            >
              <Gift className="mr-2" size={20} />
              Indicar Agora e Ganhar
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Quando recebo o mês grátis?",
                a: "Você recebe o mês grátis automaticamente quando seu indicado completar o primeiro mês de contrato conosco."
              },
              {
                q: "Existe limite de indicações?",
                a: "Não! Você pode indicar quantos amigos quiser. Quanto mais indica, mais você ganha!"
              },
              {
                q: "Como sei se meu amigo se cadastrou com meu código?",
                a: "Você receberá uma notificação por email e WhatsApp quando uma indicação for realizada."
              },
              {
                q: "Os benefícios expiram?",
                a: "Os meses grátis não expiram. Você pode usar quando quiser."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <ReferralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}