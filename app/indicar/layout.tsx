import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Indique e Ganhe | Ondeline Telecom",
  description:
    "Indique amigos para contratar internet Ondeline e ganhe benefícios na mensalidade. Programa de indicação para clientes no Vale do Juruá.",
  alternates: { canonical: "/indicar" },
  openGraph: {
    title: "Indique e Ganhe Ondeline",
    description: "Ganhe benefícios ao indicar amigos para a internet Ondeline.",
    type: "website",
  },
}

export default function IndicarLayout({ children }: { children: React.ReactNode }) {
  return children
}
