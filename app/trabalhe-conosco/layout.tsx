import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trabalhe Conosco | Ondeline Telecom",
  description:
    "Envie sua candidatura para trabalhar na Ondeline Telecom e fazer parte da equipe que conecta o Vale do Juruá.",
  alternates: { canonical: "/trabalhe-conosco" },
  openGraph: {
    title: "Trabalhe Conosco Ondeline",
    description: "Oportunidades para técnicos, suporte, atendimento e áreas administrativas no interior do Amazonas.",
    type: "website",
  },
}

export default function TrabalheConoscoLayout({ children }: { children: React.ReactNode }) {
  return children
}
