import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Internet em Ipixuna - Ondeline Telecom",
  description: "Internet de alta velocidade em Ipixuna, Amazonas. Planos a partir de R$ 100 com suporte 24/7 e instalação rápida.",
  keywords: ["internet ipixuna", "provedor ipixuna", "wifi ipixuna", "fibra óptica ipixuna", "ondeline"],
  alternates: { canonical: "https://ondeline.com.br/ipixuna" },
}

export default function IpixunaLayout({ children }: { children: React.ReactNode }) {
  return children
}
