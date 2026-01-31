import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/lib/theme-context"
import { Providers } from "./providers"
import { getSiteConfig } from "@/lib/site-config"
import { Toaster } from "sonner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  
  return {
    title: config.title || "Ondeline - Internet Rápida no Amazonas",
    description: config.description || "Internet de alta velocidade em Ipixuna, Eirunepe, Itamarati e Carauari. Suporte rápido 24/7 e planos a partir de R$ 100.",
    keywords: config.keywords?.join(", "),
    robots: config.metaRobots || "index, follow",
    generator: "v0.app",
    ...(config.canonicalUrl && {
      alternates: {
        canonical: config.canonicalUrl,
      },
    }),
    openGraph: {
      title: config.title || "Ondeline - Internet Rápida no Amazonas",
      description: config.description || "Conectando o Amazonas com internet de qualidade",
      type: "website",
      ...(config.ogImage && { images: [config.ogImage] }),
      ...(config.canonicalUrl && { url: config.canonicalUrl }),
    },
    twitter: {
      card: "summary_large_image",
      title: config.title || "Ondeline - Internet Rápida no Amazonas",
      description: config.description || "Conectando o Amazonas com internet de qualidade",
      ...(config.ogImage && { images: [config.ogImage] }),
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
          <ThemeProvider>
            {children}
            <Toaster 
              position="top-right"
              expand={true}
              richColors
              closeButton
            />
          </ThemeProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
