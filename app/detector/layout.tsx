// app/detector/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Detector Ondeline | Status dos Serviços",
  description: "Monitor em tempo real dos principais serviços — por Ondeline Telecom.",
  robots: { index: false, follow: false },
}

export default function DetectorLayout({ children }: { children: React.ReactNode }) {
  return children
}
