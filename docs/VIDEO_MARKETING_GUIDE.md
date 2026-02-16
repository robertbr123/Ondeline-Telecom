# 🎥 Guia de Uso do Componente de Vídeo Marketing

## 📋 Visão Geral

O arquivo `components/video-marketing.tsx` contém 3 componentes reutilizáveis para adicionar vídeos ao site:

1. **VideoMarketing** - Player de vídeo customizado
2. **VideoCard** - Card para exibir vídeo em grid
3. **VideoGallery** - Seção completa com múltiplos vídeos

---

## 1️⃣ VideoMarketing - Player de Vídeo Simples

### Uso Básico

```tsx
import { VideoMarketing } from "@/components/video-marketing"

export default function MinhaPagina() {
  return (
    <VideoMarketing
      videoUrl="/videos/meu-video.mp4"
      thumbnail="/images/thumb-video.jpg"
      title="Meu Vídeo Incrível"
      description="Descrição do vídeo"
    />
  )
}
```

### Props Disponíveis

| Prop | Tipo | Obrigatório | Descrição |
|------|--------|--------------|-------------|
| `videoUrl` | string | ✅ Sim | URL do arquivo de vídeo (.mp4, .webm, .ogg) |
| `thumbnail` | string | ❌ Não | URL da imagem de capa do vídeo |
| `title` | string | ❌ Não | Título do vídeo (exibido no overlay) |
| `description` | string | ❌ Não | Descrição do vídeo (exibida no overlay) |
| `autoPlay` | boolean | ❌ Não | Auto-play do vídeo (default: false) |
| `className` | string | ❌ Não | Classes CSS adicionais |

### Exemplos Práticos

#### Vídeo com Tamanho Customizado
```tsx
<VideoMarketing
  videoUrl="/videos/introducao-ondeline.mp4"
  thumbnail="/images/thumb-introducao.jpg"
  title="Conheça a Ondeline"
  description="A melhor internet do Amazonas"
  className="w-full max-w-4xl mx-auto"
/>
```

#### Vídeo em Tela Cheia
```tsx
<VideoMarketing
  videoUrl="/videos/pitch-de-vendas.mp4"
  thumbnail="/images/pitch-thumb.jpg"
  className="w-full aspect-video"
/>
```

#### Vídeo sem Thumbnail
```tsx
<VideoMarketing
  videoUrl="/videos/streaming-ao-vivo.mp4"
  title="Live Demo"
  autoPlay={true}
/>
```

---

## 2️⃣ VideoCard - Card para Grid de Vídeos

### Uso Básico

```tsx
import { VideoCard } from "@/components/video-marketing"

export default function PaginaVideos() {
  return (
    <VideoCard
      title="Tutorial: Como Instalar"
      description="Aprenda a instalar sua internet Ondeline"
      videoUrl="/videos/tutorial-instalacao.mp4"
      thumbnail="/images/thumb-tutorial.jpg"
      duration="3:45"
      views="1.2k"
      date="15/02/2026"
    />
  )
}
```

### Props Disponíveis

| Prop | Tipo | Obrigatório | Descrição |
|------|--------|--------------|-------------|
| `title` | string | ✅ Sim | Título do vídeo |
| `description` | string | ✅ Sim | Descrição curta do vídeo |
| `videoUrl` | string | ✅ Sim | URL do arquivo de vídeo |
| `thumbnail` | string | ✅ Sim | URL da imagem de capa |
| `duration` | string | ❌ Não | Duração do vídeo (ex: "3:45", "10:20") |
| `views` | string | ❌ Não | Número de visualizações (ex: "1.2k", "5k") |
| `date` | string | ❌ Não | Data de publicação (ex: "15/02/2026") |

### Exemplos Práticos

#### Grid de Vídeos de Tutoriais
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <VideoCard
    title="Instalação do Roteador"
    description="Passo a passo completo"
    videoUrl="/videos/instalacao-roteador.mp4"
    thumbnail="/images/thumb-roteador.jpg"
    duration="5:30"
    views="3.5k"
  />
  
  <VideoCard
    title="Configurar Wi-Fi"
    description="Melhorar sinal em casa"
    videoUrl="/videos/configurar-wifi.mp4"
    thumbnail="/images/thumb-wifi.jpg"
    duration="4:15"
    views="2.8k"
  />
  
  <VideoCard
    title="Teste de Velocidade"
    description="Como medir sua internet"
    videoUrl="/videos/teste-velocidade.mp4"
    thumbnail="/images/thumb-velocidade.jpg"
    duration="2:45"
    views="5.1k"
  />
</div>
```

#### Vídeos de Depoimentos
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <VideoCard
    title="Depoimento: Maria Silva"
    description="Cliente de Ipixuna"
    videoUrl="/videos/depoimento-maria.mp4"
    thumbnail="/images/depoimento-maria.jpg"
    duration="2:30"
    views="1.2k"
  />
  
  <VideoCard
    title="Depoimento: João Santos"
    description="Cliente de Eirunepe"
    videoUrl="/videos/depoimento-joao.mp4"
    thumbnail="/images/depoimento-joao.jpg"
    duration="3:00"
    views="950"
  />
</div>
```

---

## 3️⃣ VideoGallery - Seção Completa de Vídeos

### Uso Básico

```tsx
import { VideoGallery } from "@/components/video-marketing"

const videos = [
  {
    title: "Instalação Completa",
    description: "Guia completo de instalação",
    videoUrl: "/videos/instalacao.mp4",
    thumbnail: "/images/thumb-instalacao.jpg",
    duration: "8:30",
    views: "5.2k",
    date: "15/01/2026"
  },
  {
    title: "Configurar Wi-Fi",
    description: "Melhorar sinal em casa",
    videoUrl: "/videos/wifi.mp4",
    thumbnail: "/images/thumb-wifi.jpg",
    duration: "5:15",
    views: "3.8k",
    date: "20/01/2026"
  },
  // ... mais vídeos
]

export default function PaginaVideos() {
  return (
    <VideoGallery
      title="Vídeos Técnicos"
      description="Aprenda a configurar e otimizar sua internet"
      videos={videos}
    />
  )
}
```

### Props Disponíveis

| Prop | Tipo | Obrigatório | Descrição |
|------|--------|--------------|-------------|
| `title` | string | ❌ Não | Título da seção |
| `description` | string | ❌ Não | Descrição da seção |
| `videos` | VideoCardProps[] | ✅ Sim | Array de objetos com dados dos vídeos |

### Exemplos Práticos

#### Galeria de Tutoriais
```tsx
const tutoriais = [
  {
    title: "Instalar Roteador",
    description: "Passo a passo simples",
    videoUrl: "/videos/instalar-roteador.mp4",
    thumbnail: "/images/thumb-roteador.jpg",
    duration: "5:30",
    views: "3.5k",
    date: "10/01/2026"
  },
  {
    title: "Configurar Wi-Fi 5GHz",
    description: "Para dispositivos próximos",
    videoUrl: "/videos/wifi-5ghz.mp4",
    thumbnail: "/images/thumb-5ghz.jpg",
    duration: "3:45",
    views: "2.1k",
    date: "15/01/2026"
  },
  {
    title: "Teste de Velocidade",
    description: "Como medir corretamente",
    videoUrl: "/videos/teste-velocidade.mp4",
    thumbnail: "/images/thumb-velocidade.jpg",
    duration: "4:20",
    views: "4.8k",
    date: "20/01/2026"
  }
]

<VideoGallery
  title="📚 Tutoriais Técnicos"
  description="Aprenda a instalar, configurar e otimizar sua internet Ondeline"
  videos={tutoriais}
/>
```

#### Galeria de Depoimentos
```tsx
const depoimentos = [
  {
    title: "Maria Silva - Ipixuna",
    description: "Há 1 ano com Ondeline",
    videoUrl: "/videos/depoimento-maria.mp4",
    thumbnail: "/images/depoimento-maria.jpg",
    duration: "2:30",
    views: "1.5k"
  },
  {
    title: "João Santos - Eirunepe",
    description: "Internet para home office",
    videoUrl: "/videos/depoimento-joao.mp4",
    thumbnail: "/images/depoimento-joao.jpg",
    duration: "3:15",
    views: "2.2k"
  },
  {
    title: "Ana Costa - Itamarati",
    description: "Streaming 4K sem problemas",
    videoUrl: "/videos/depoimento-ana.mp4",
    thumbnail: "/images/depoimento-ana.jpg",
    duration: "2:45",
    views: "1.8k"
  }
]

<VideoGallery
  title="⭐ Depoimentos de Clientes"
  description="Veja o que nossos clientes dizem sobre a Ondeline"
  videos={depoimentos}
/>
```

---

## 📱 Implementação em Páginas Existentes

### Adicionar Vídeo na Página Inicial

```tsx
// app/page.tsx
import { VideoMarketing } from "@/components/video-marketing"

export default function HomePage() {
  return (
    <main>
      {/* ... conteúdo existente ... */}
      
      {/* Nova seção de vídeo */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <VideoMarketing
            videoUrl="/videos/introducao-ondeline.mp4"
            thumbnail="/images/introducao-thumb.jpg"
            title="Conheça a Ondeline"
            description="A internet de qualidade que o Amazonas merece"
            className="rounded-2xl overflow-hidden"
          />
        </div>
      </section>
      
      {/* ... mais conteúdo ... */}
    </main>
  )
}
```

### Criar Página de Vídeos

```tsx
// app/videos/page.tsx
"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VideoGallery } from "@/components/video-marketing"

const videos = [
  {
    title: "Instalação do Roteador",
    description: "Passo a passo completo",
    videoUrl: "/videos/instalacao-roteador.mp4",
    thumbnail: "/images/thumb-roteador.jpg",
    duration: "5:30",
    views: "3.5k",
    date: "15/01/2026"
  },
  // ... mais vídeos
]

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <VideoGallery
          title="📹 Vídeos Ondeline"
          description="Tutoriais, depoimentos e novidades"
          videos={videos}
        />
      </main>
      
      <Footer />
    </div>
  )
}
```

### Adicionar Vídeos na Página de Suporte

```tsx
// app/suporte/page.tsx
import { VideoGallery } from "@/components/video-marketing"

const tutoriaisSuporte = [
  {
    title: "Reiniciar Roteador",
    description: "Quando a internet cair",
    videoUrl: "/videos/reiniciar-roteador.mp4",
    thumbnail: "/images/thumb-reiniciar.jpg",
    duration: "2:15",
    views: "8.2k"
  },
  {
    title: "Testar Conexão",
    description: "Como fazer speed test",
    videoUrl: "/videos/testar-conexao.mp4",
    thumbnail: "/images/thumb-testar.jpg",
    duration: "3:30",
    views: "6.5k"
  }
]

export default function SuportePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ... conteúdo de suporte ... */}
      
      <section className="py-12">
        <VideoGallery
          title="🛠️ Vídeos de Suporte"
          description="Resolução rápida de problemas comuns"
          videos={tutoriaisSuporte}
        />
      </section>
    </div>
  )
}
```

---

## 🎨 Customização de Estilos

### Mudar Cores do Player

O componente usa Tailwind CSS classes. Você pode customizar estilos adicionando classes:

```tsx
<VideoMarketing
  videoUrl="/videos/meu-video.mp4"
  thumbnail="/images/thumb.jpg"
  className="border-4 border-primary shadow-2xl rounded-2xl"
/>
```

### Mudar Tamanho

```tsx
<VideoMarketing
  videoUrl="/videos/meu-video.mp4"
  thumbnail="/images/thumb.jpg"
  className="w-full max-w-2xl aspect-video"  // Mais pequeno
/>
```

### Mudar Tamanho do Card

```tsx
<VideoCard
  title="Meu Vídeo"
  description="Descrição"
  videoUrl="/videos/meu-video.mp4"
  thumbnail="/images/thumb.jpg"
  duration="5:00"
  className="border-2 border-primary shadow-xl"  // Adiciona borda e sombra
/>
```

---

## 📦 Preparando Vídeos

### Formatos Suportados

O componente HTML5 `<video>` suporta:
- **MP4** (H.264 + AAC) - Mais compatível
- **WebM** (VP8/VP9 + Vorbis) - Alta qualidade
- **OGG** (Theora + Vorbis) - Alternativa open source

### Otimização de Vídeos

```bash
# Converter para WebM com FFmpeg
ffmpeg -i input.mp4 -c:v libvpx -c:a libvorbis output.webm

# Criar thumbnail
ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 thumb.jpg

# Comprimir com qualidade
ffmpeg -i input.mp4 -crf 28 -preset medium output.mp4
```

### Onde Guardar Vídeos

```
public/
├── videos/
│   ├── introducao-ondeline.mp4
│   ├── instalacao-roteador.mp4
│   ├── depoimento-maria.mp4
│   └── ...
└── images/
    ├── thumb-introducao.jpg
    ├── thumb-instalacao.jpg
    └── ...
```

---

## 📊 Analytics e Tracking

### Adicionar Tracking de Visualizações

```tsx
'use client'

import { useEffect } from 'react'
import { VideoMarketing } from "@/components/video-marketing"

export function TrackedVideo({ videoId, ...props }: any) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      // Enviar para API de analytics
      fetch('/api/analytics/video', {
        method: 'POST',
        body: JSON.stringify({ videoId })
      })
    }
  }, [isPlaying])

  return (
    <VideoMarketing
      {...props}
      autoPlay={isPlaying}
    />
  )
}
```

---

## 🎯 Ideias de Uso para Ondeline

### 1. Página de Vídeos (/videos)

Criar uma página dedicada com todas as categorias:
- 📚 Tutoriais Técnicos
- ⭐ Depoimentos
- 📰 Notícias em Vídeo
- 🎥 Bastidores da Empresa

### 2. Seção na Página Inicial

Adicionar vídeo de apresentação no hero section:
```tsx
<VideoMarketing
  videoUrl="/videos/pitch-principal.mp4"
  thumbnail="/images/pitch-thumb.jpg"
  title="Internet de Qualidade para o Amazonas"
  className="rounded-2xl overflow-hidden"
/>
```

### 3. Página de Suporte

Adicionar vídeos de resolução de problemas:
- Reiniciar roteador
- Testar velocidade
- Configurar Wi-Fi
- Troubleshooting

### 4. Página de Planos

Vídeo demonstrando cada plano:
```tsx
<VideoCard
  title="Plano 50MB"
  description="Ideal para 1-2 pessoas"
  videoUrl="/videos/plano-50mb.mp4"
  thumbnail="/images/thumb-50mb.jpg"
  duration="2:00"
/>
```

### 5. Página de Indicações

Vídeo explicando como funciona:
```tsx
<VideoMarketing
  videoUrl="/videos/como-indicar.mp4"
  thumbnail="/images/thumb-indicar.jpg"
  title="Como Funciona o Programa de Indicações"
  description="Ganhe 1 mês grátis por amigo indicado"
/>
```

---

## ⚡ Performance Tips

### 1. Lazy Loading

Para muitos vídeos, use lazy loading:
```tsx
import dynamic from 'next/dynamic'

const VideoMarketing = dynamic(
  () => import('@/components/video-marketing').then(mod => mod.VideoMarketing),
  { loading: () => <div>Carregando...</div>, ssr: false }
)
```

### 2. Thumbnail Otimizado

Use WebP para thumbnails:
```tsx
thumbnail="/images/thumb-video.webp"  // Ao invés de .jpg
```

### 3. Vídeo Comprimido

Comprimir vídeos sem perder muita qualidade:
```bash
# Compressão moderada
ffmpeg -i input.mp4 -crf 28 -preset medium output.mp4

# Compressão agressiva
ffmpeg -i input.mp4 -crf 35 -preset veryfast output.mp4
```

---

## 🐛 Troubleshooting

### Vídeo Não Toca

**Problema:** Vídeo não inicia ao clicar

**Solução:** Verifique se o arquivo existe e URL está correta:
```tsx
// ❌ Errado
videoUrl="/videos/meu-video"  // Sem extensão

// ✅ Correto
videoUrl="/videos/meu-video.mp4"  // Com extensão
```

### Thumbnail Não Aparece

**Problema:** Imagem de capa não mostra

**Solução:** Verifique se o caminho está correto:
```tsx
// ❌ Errado
thumbnail="thumb.jpg"  // Caminho relativo

// ✅ Correto
thumbnail="/images/thumb.jpg"  // Caminho absoluto
```

### Vídeo em Mobile

**Problema:** Vídeo não funciona em alguns celulares

**Solução:** Adicione `playsInline`:
```tsx
// No componente VideoMarketing
<video
  playsInline  // Adicione esta prop
  // ... outras props
/>
```

---

## 📚 Exemplos Completos

### Exemplo 1: Página de Vídeos Completa

```tsx
// app/videos/page.tsx
"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VideoGallery } from "@/components/video-marketing"

const tutoriais = [
  {
    title: "Instalação do Roteador",
    description: "Passo a passo completo",
    videoUrl: "/videos/instalacao-roteador.mp4",
    thumbnail: "/images/thumb-roteador.jpg",
    duration: "5:30",
    views: "3.5k",
    date: "15/01/2026"
  },
  {
    title: "Configurar Wi-Fi",
    description: "Melhorar sinal em casa",
    videoUrl: "/videos/configurar-wifi.mp4",
    thumbnail: "/images/thumb-wifi.jpg",
    duration: "4:15",
    views: "2.8k",
    date: "20/01/2026"
  }
]

const depoimentos = [
  {
    title: "Maria Silva - Ipixuna",
    description: "Há 1 ano com Ondeline",
    videoUrl: "/videos/depoimento-maria.mp4",
    thumbnail: "/images/depoimento-maria.jpg",
    duration: "2:30",
    views: "1.5k"
  },
  {
    title: "João Santos - Eirunepe",
    description: "Internet para home office",
    videoUrl: "/videos/depoimento-joao.mp4",
    thumbnail: "/images/depoimento-joao.jpg",
    duration: "3:15",
    views: "2.2k"
  }
]

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              📹 Vídeos Ondeline
            </h1>
            <p className="text-xl text-muted-foreground">
              Tutoriais, depoimentos e tudo sobre internet de qualidade
            </p>
          </div>
        </section>

        {/* Tutoriais */}
        <VideoGallery
          title="📚 Tutoriais Técnicos"
          description="Aprenda a instalar e configurar sua internet"
          videos={tutoriais}
        />

        {/* Depoimentos */}
        <VideoGallery
          title="⭐ Depoimentos"
          description="O que nossos clientes dizem"
          videos={depoimentos}
        />
      </main>
      
      <Footer />
    </div>
  )
}
```

---

## 🎉 Conclusão

O componente de vídeo marketing é fácil de usar e altamente customizável:

✅ **VideoMarketing** - Para vídeos únicos destacados
✅ **VideoCard** - Para grids de vídeos (tutoriais, depoimentos)
✅ **VideoGallery** - Para seções completas de vídeos

Comece adicionando vídeos hoje e veja o engajamento aumentar!

**Próximos passos:**
1. Gravar 3-5 vídeos iniciais
2. Adicionar ao site usando os componentes
3. Medir analytics de visualizações
4. Criar mais vídeos baseados no sucesso

---

**Documento criado em 15/02/2026**