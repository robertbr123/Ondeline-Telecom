import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/lib/theme-context"
import { Providers } from "./providers"
import { getSiteConfig } from "@/lib/site-config"
import { Toaster } from "sonner"
import SkipLink from "@/components/skip-link"
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
    <html lang="pt-BR" suppressHydrationWarning style={{ scrollBehavior: 'smooth' }}>
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
      <body className={`font-sans antialiased`}>
        <SkipLink />
        <Providers>
          <ThemeProvider>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
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
