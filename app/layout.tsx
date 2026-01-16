import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/lib/theme-context"
import { Providers } from "./providers"
import { getSiteConfig } from "@/lib/site-config"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  
  return {
    title: config.title || "Ondeline - Internet Rápida no Amazonas",
    description: config.description || "Internet de alta velocidade em Ipixuna, Eirunepe, Itamarati e Carauari. Suporte rápido 24/7 e planos a partir de R$ 100.",
    keywords: config.keywords?.join(", "),
    generator: "v0.app",
    openGraph: {
      title: config.title || "Ondeline - Internet Rápida no Amazonas",
      description: config.description || "Conectando o Amazonas com internet de qualidade",
      type: "website",
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
