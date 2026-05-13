import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Status da Rede | Ondeline Telecom",
  description:
    "Acompanhe o status dos serviços da Ondeline Telecom, disponibilidade da rede e informações de monitoramento.",
  alternates: { canonical: "/status" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Status da Rede Ondeline",
    description: "Monitoramento público dos serviços da Ondeline Telecom.",
    type: "website",
  },
}

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return children
}
