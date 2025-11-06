"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  const faqs = [
    {
      question: "Qual é a velocidade garantida?",
      answer:
        "Todos os nossos planos possuem velocidade garantida em contrato. Oferecemos 20MB, 50MB, 80MB e planos customizados conforme sua necessidade.",
    },
    {
      question: "Como funciona o suporte?",
      answer:
        "Temos suporte 24/7 disponível por WhatsApp, telefone e presencialmente. Nosso tempo médio de resposta é de menos de 15 minutos.",
    },
    {
      question: "Vocês estão em minha cidade?",
      answer:
        "Atualmente atendemos Ipixuna e Eirunepe. Em breve estaremos em Itamarati e Carauari. Consulte-nos para confirmar sua região.",
    },
    {
      question: "Qual é o contrato?",
      answer:
        "Oferecemos planos flexíveis com contrato de 12 meses. Você pode optar por planos mensais com taxa adicional.",
    },
    {
      question: "Como é feita a instalação?",
      answer:
        "Nossos técnicos especializados farão a instalação gratuitamente em sua residência ou empresa, sem custos adicionais.",
    },
    {
      question: "Vocês atendem empresas?",
      answer:
        "Sim! Atendemos desde residências até grandes empresas como Bradesco, Correios e CETAM. Consulte-nos para planos corporativos.",
    },
  ]

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Perguntas Frequentes</h2>
          <p className="text-lg text-slate-400">Tire suas dúvidas sobre nossos serviços</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-700 rounded-lg overflow-hidden bg-slate-800/50 hover:border-cyan-500/50 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white text-left">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-500 transition-transform duration-300 flex-shrink-0 ${
                    openIdx === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-700 text-slate-300">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
