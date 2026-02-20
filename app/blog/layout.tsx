import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Ondeline - Internet no Amazonas',
  description: 'Dicas, notícias e atualizações sobre internet de qualidade em Ipixuna, Eirunepé, Itamarati e Carauari.',
  keywords: 'blog, internet, amazonas, ipixuna, eirunepe, itamarati, carauari, wifi, tecnologia, dicas',
  openGraph: {
    title: 'Blog Ondeline',
    description: 'Dicas, notícias e informações sobre internet de qualidade na Amazônia',
    type: 'website',
    siteName: 'Ondeline',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Ondeline',
    description: 'Dicas, notícias e informações sobre internet de qualidade na Amazônia',
  },
  alternates: {
    canonical: 'https://ondeline.com.br/blog',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
