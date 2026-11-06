import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/lib/theme-context"
import { Providers } from "./providers"
import { getSiteConfig } from "@/lib/site-config"
import { Toaster } from "sonner"
import SkipLink from "@/components/skip-link"
import "./globals.css"
import "@/styles/ondeline2.css"

// Fontes dentro do projeto: o build não depende mais de baixar do Google
const geist = localFont({ src: "./fonts/geist.woff2", variable: "--font-geist", weight: "100 900", display: "swap" })
const geistMono = localFont({ src: "./fonts/geist-mono.woff2", variable: "--font-geist-mono", weight: "100 900", display: "swap" })
const manrope = localFont({ src: "./fonts/manrope.woff2", variable: "--font-manrope", weight: "200 800", display: "swap" })

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ondeline.com.br"),
    title: config.title || "Ondeline - Internet Rápida no Amazonas",
    description: config.description || "Internet de alta velocidade em Ipixuna, Eirunepe, Itamarati e Carauari. Suporte rápido 24/7 e planos a partir de R$ 100.",
    keywords: config.keywords?.join(", "),
    robots: config.metaRobots || "index, follow",
    ...(config.canonicalUrl && {
      alternates: {
        canonical: config.canonicalUrl,
      },
    }),
    openGraph: {
      title: config.title || "Ondeline - Internet Rápida no Amazonas",
      description: config.description || "Conectando o Amazonas com internet de qualidade",
      type: "website",
      images: config.ogImage
        ? [{ url: config.ogImage, width: 1200, height: 630 }]
        : [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Ondeline - Internet Rápida no Amazonas' }],
      ...(config.canonicalUrl && { url: config.canonicalUrl }),
    },
    twitter: {
      card: "summary_large_image",
      title: config.title || "Ondeline - Internet Rápida no Amazonas",
      description: config.description || "Conectando o Amazonas com internet de qualidade",
      images: config.ogImage ? [config.ogImage] : ['/opengraph-image'],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning style={{ scrollBehavior: 'smooth' }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InternetServiceProvider",
              name: "Ondeline Telecom",
              description: "Internet de alta velocidade em Ipixuna, Eirunepé, Itamarati e Carauari no Amazonas.",
              url: "https://ondeline.com.br",
              telephone: "(92) 98460-7721",
              email: "contato@ondeline.com.br",
              address: { "@type": "PostalAddress", addressRegion: "Amazonas", addressCountry: "BR" },
              areaServed: [
                { "@type": "City", name: "Ipixuna", addressRegion: "Amazonas" },
                { "@type": "City", name: "Eirunepé", addressRegion: "Amazonas" },
                { "@type": "City", name: "Itamarati", addressRegion: "Amazonas" },
                { "@type": "City", name: "Carauari", addressRegion: "Amazonas" },
              ],
              priceRange: "R$ 100 - R$ 150",
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased ${manrope.variable} ${geist.variable} ${geistMono.variable}`}>
        <SkipLink />
        <Providers>
          <ThemeProvider>
            <div id="main-content" tabIndex={-1}>
              {children}
            </div>
            <Toaster 
              position="top-right"
              expand={true}
              richColors
              closeButton
            />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
