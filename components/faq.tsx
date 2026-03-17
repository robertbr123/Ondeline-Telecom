"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useFAQs } from "@/hooks/useAPI"
import { LoadingCard } from "./loading"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  order: number
  active: boolean
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)
  const { data: faqs, loading } = useFAQs()

  return (
    <section className="w-full py-24 px-4 bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-slate-400">Tire suas dúvidas sobre nossos serviços</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : !faqs || faqs.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-slate-500">Nenhuma pergunta disponível</div>
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq: FAQItem, idx: number) => {
              const isOpen = openIdx === idx
              return (
                <div
                  key={faq.id}
                  className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-cyan-500/40 shadow-lg shadow-cyan-500/5"
                      : "hover:border-slate-600"
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <h3 className={`text-lg font-semibold text-left transition-colors ${isOpen ? "text-cyan-300" : "text-white"}`}>
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-500 transition-transform duration-300 flex-shrink-0 ml-4 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-slate-700/50 text-slate-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
