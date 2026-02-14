import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Internet em Eirunepé - Ondeline Telecom",
  description: "Internet de alta velocidade em Eirunepé, Amazonas. Planos a partir de R$ 100 com suporte 24/7 e instalação rápida.",
  keywords: ["internet eirunepe", "provedor eirunepe", "wifi eirunepe", "fibra óptica eirunepe", "ondeline"],
  alternates: { canonical: "https://ondeline.com.br/eirunepe" },
}

export default function EirunepeLayout({ children }: { children: React.ReactNode }) {
  return children
}
