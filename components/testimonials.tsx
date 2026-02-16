"use client"

import { Star } from "lucide-react"
import { MotionCard } from "@/components/motion-card"

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  avatar?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  className?: string
}

export function Testimonials({ testimonials, className = "" }: TestimonialsProps) {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja o que nossos clientes satisfeitos têm a dizer sobre a Ondeline
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <MotionCard
              key={testimonial.id}
              className="p-6 rounded-xl border bg-card hover:border-primary/50 transition-all"
              delay={idx * 0.1}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.avatar || testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  )
}