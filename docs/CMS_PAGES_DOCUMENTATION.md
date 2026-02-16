# CMS de Páginas - Documentação Completa
## Data: 15/02/2025

---

## 📋 Visão Geral

Sistema de CMS (Content Management System) para editar qualquer página do site através do painel administrativo, sem precisar modificar código.

---

## 🎯 Funcionalidades

### O que você pode fazer:
1. ✅ **Editar qualquer página do site** (Ipixuna, Eirunepe, Itamarati, Carauari, Empresas, Cobertura, Indicar)
2. ✅ **Criar novas páginas** com URLs personalizadas
3. ✅ **Alterar conteúdo HTML/Markdown** sem programação
4. ✅ **Configurar SEO** (Meta Title, Meta Description, Keywords)
5. ✅ **Customizar Hero** (Título, Subtítulo, Imagem)
6. ✅ **Ativar/Desativar páginas** facilmente

---

## 📦 Estrutura da Tabela `pages`

```sql
CREATE TABLE pages (
  id VARCHAR(255) PRIMARY KEY,              -- ID único da página
  slug VARCHAR(255) UNIQUE NOT NULL,         -- URL amigável (ex: ipixuna)
  title VARCHAR(255) NOT NULL,               -- Título da página
  content TEXT NOT NULL,                       -- Conteúdo principal (HTML/Markdown)
  description TEXT,                           -- Descrição curta
  meta_title VARCHAR(255),                     -- Título SEO
  meta_description TEXT,                       -- Descrição SEO
  keywords TEXT[],                             -- Palavras-chave SEO
  hero_title VARCHAR(255),                     -- Título da seção hero
  hero_subtitle TEXT,                          -- Subtítulo da seção hero
  hero_image VARCHAR(500),                     -- URL da imagem do hero
  active BOOLEAN DEFAULT true,                  -- Se a página está ativa
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Data de criação
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Data de atualização
);
```

---

## 🚀 Como Usar

### Passo 1: Acessar o Painel de Páginas

1. Vá para `/admin`
2. Clique no card **"Páginas"**
3. Você verá todas as páginas disponíveis

### Passo 2: Editar uma Página Existente

1. Na lista de páginas, clique em **"Editar"** na página desejada
2. Preencha os campos conforme necessário
3. Clique em **"Salvar Página"**

### Passo 3: Criar uma Nova Página

1. Clique no botão **"Nova Página"**
2. Preencha todos os campos obrigatórios (*)
3. Clique em **"Salvar Página"**

### Passo 4: Deletar uma Página

1. Clique no ícone de lixeira 🗑️ na página desejada
2. Confirme a exclusão

---

## 📝 Campos Disponíveis

### Campos Obrigatórios (marcados com *)

| Campo | Descrição | Exemplo |
|--------|-----------|---------|
| **Slug*** | URL amigável da página | `ipixuna`, `sobre`, `novidades` |
| **Title*** | Título da página | `Internet em Ipixuna` |
| **Content*** | Conteúdo principal (HTML/Markdown) | `<p>Nosso texto aqui...</p>` |

### Campos Opcionais

| Campo | Descrição | Exemplo |
|--------|-----------|---------|
| **Description** | Descrição curta da página | `Melhor internet de Ipixuna` |
| **Hero Title** | Título da seção hero | `Internet de Alta Velocidade` |
| **Hero Subtitle** | Subtítulo da seção hero | `Conecte sua casa agora` |
| **Hero Image** | URL da imagem do hero | `https://exemplo.com/imagem.jpg` |

### Campos SEO

| Campo | Descrição | Exemplo |
|--------|-----------|---------|
| **Meta Title** | Título para motores de busca | `Internet Ipixuna - Ondeline` |
| **Meta Description** | Descrição para Google | `Internet rápida em Ipixuna a partir de R$100` |
| **Keywords** | Palavras-chave (separadas por vírgula) | `internet, wifi, ipixuna, amazonas` |

### Campo de Controle

| Campo | Descrição |
|--------|-----------|
| **Active** | Marque para tornar a página visível no site |

---

## 🎨 Como Escrever Conteúdo

### Usando HTML

```html
<h2>Sobre Nossos Serviços</h2>
<p>Nós oferecemos internet de alta velocidade com:</p>
<ul>
  <li>Velocidade de até 1Gbps</li>
  <li>Suporte 24/7</li>
  <li>Instalação gratuita</li>
</ul>

<a href="https://wa.me/5592984607721" class="btn">
  Falar com Consultor
</a>
```

### Usando Markdown

```markdown
## Sobre Nossos Serviços

Nós oferecemos internet de alta velocidade com:

- Velocidade de até 1Gbps
- Suporte 24/7
- Instalação gratuita

[Falar com Consultor](https://wa.me/5592984607721)
```

### Classes CSS Disponíveis

```html
<!-- Botões -->
<button class="btn">Botão Primário</button>
<button class="btn btn-secondary">Botão Secundário</button>

<!-- Cards -->
<div class="card">
  <h3>Título do Card</h3>
  <p>Conteúdo do card</p>
</div>

<!-- Grid -->
<div class="grid grid-cols-2">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## 🌐 Páginas Padrão Criadas

O sistema já criou automaticamente as seguintes páginas:

| Slug | Título | URL |
|-------|---------|------|
| `ipixuna` | Internet em Ipixuna | `/ipixuna` |
| `eirunepe` | Internet em Eirunepe | `/eirunepe` |
| `itamarati` | Internet em Itamarati | `/itamarati` |
| `carauari` | Internet em Carauari | `/carauari` |
| `empresas` | Soluções para Empresas | `/empresas` |
| `coverage` | Mapa de Cobertura | `/coverage` |
| `indicar` | Indique um Amigo | `/indicar` |

---

## 🔧 APIs Disponíveis

### GET `/api/pages` - Listar todas as páginas

**Resposta**:
```json
{
  "success": true,
  "data": [
    {
      "id": "page-abc123",
      "slug": "ipixuna",
      "title": "Internet em Ipixuna",
      "content": "<p>...</p>",
      "description": "Melhor internet",
      "meta_title": "Internet Ipixuna",
      "meta_description": "Descrição",
      "keywords": ["internet", "wifi"],
      "hero_title": "Internet Rápida",
      "hero_subtitle": "Conecte-se agora",
      "hero_image": "https://...",
      "active": true,
      "created_at": "2025-02-15T12:00:00.000Z",
      "updated_at": "2025-02-15T12:00:00.000Z"
    }
  ]
}
```

### GET `/api/pages?slug=ipixuna` - Buscar página específica

**Resposta**:
```json
{
  "success": true,
  "data": {
    "id": "page-abc123",
    "slug": "ipixuna",
    "title": "Internet em Ipixuna",
    ...
  }
}
```

### POST `/api/pages` - Criar nova página

**Body**:
```json
{
  "slug": "sobre",
  "title": "Sobre a Ondeline",
  "content": "<p>Nossa história...</p>",
  "description": "Conheça nossa empresa",
  "meta_title": "Sobre - Ondeline",
  "meta_description": "História da Ondeline",
  "keywords": ["ondeline", "sobre", "empresa"],
  "hero_title": "Sobre a Ondeline",
  "hero_subtitle": "Conectando o Amazonas",
  "hero_image": "https://exemplo.com/imagem.jpg",
  "active": true
}
```

### PUT `/api/pages/{slug}` - Atualizar página

**Body**:
```json
{
  "title": "Novo Título",
  "content": "<p>Novo conteúdo...</p>",
  "description": "Nova descrição",
  ...
}
```

### DELETE `/api/pages/{slug}` - Deletar página

**Resposta**:
```json
{
  "success": true,
  "message": "Página deletada com sucesso"
}
```

---

## 💡 Dicas de Uso

### 1. Edite Textos Sempre pelo CMS
✅ **Faça assim**: Editar pelo `/admin/pages`
❌ **Evite**: Editar arquivos `.tsx` diretamente

**Por quê?**
- Alterações no CMS são persistentes
- Não precisam de deploy
- Fácil para não-programadores

### 2. Use Slugs Descritivos

✅ Bom: `sobre-nos`, `planos-fibra`, `suporte-24h`
❌ Ruim: `p1`, `page-2`, `xyz`

### 3. Otimize para SEO

**Meta Title**: 50-60 caracteres
```html
Internet Ipixuna - Ondeline Telecom
```

**Meta Description**: 150-160 caracteres
```html
Internet de alta velocidade em Ipixuna. Planos a partir de R$100. Suporte 24/7.
```

**Keywords**: 5-10 palavras relevantes
```html
internet, wifi, ipixuna, amazonas, provedor, fibra
```

### 4. Use Imagens Otimizadas

- Formato: WebP ou JPG
- Tamanho: Máximo 200KB
- Dimensões: 1920x1080px ou maiores
- Alt text: Descreva sempre a imagem

### 5. Teste Antes de Publicar

1. Salve a página com `active: false`
2. Acesse a URL para verificar
3. Ative a página quando estiver pronto

---

## 🔄 Cache Automático

O sistema usa cache inteligente para performance:

- **Cache**: 15 minutos
- **Invalidação**: Automática ao criar/editar/deletar
- **Benefício**: Site rápido, sempre atualizado

---

## 🎯 Exemplos Práticos

### Exemplo 1: Atualizar Texto da Página Ipixuna

1. Acesse `/admin/pages`
2. Encontre a página "Internet em Ipixuna"
3. Clique em "Editar"
4. No campo "Hero Title", mude para:
   ```
   Internet Ultra Rápida em Ipixuna
   ```
5. Clique em "Salvar Página"
6. Acesse `/ipixuna` para ver a alteração

### Exemplo 2: Criar Página de Promoção

1. Clique em "Nova Página"
2. Preencha:
   - **Slug**: `promocao-fevereiro`
   - **Title**: `Promoção de Fevereiro`
   - **Hero Title**: `Internet Metade do Preço`
   - **Hero Subtitle**: `Só este mês em Ipixuna`
   - **Content**: `<p>Detalhes da promoção...</p>`
   - **Active**: `true`
3. Clique em "Salvar Página"
4. A página estará disponível em `/promocao-fevereiro`

### Exemplo 3: Otimizar SEO da Página Empresas

1. Edite a página "Soluções para Empresas"
2. Preencha os campos SEO:
   - **Meta Title**: `Servidores e Cloud - Ondeline`
   - **Meta Description**: `Infraestrutura empresarial com SLA garantido. Servidores dedicados, cloud computing e muito mais.`
   - **Keywords**: `servidores, cloud, hosting, empresas`
3. Clique em "Salvar Página"

---

## 📊 Integrando com Páginas Existentes

Para usar o conteúdo do CMS em uma página existente:

### Exemplo de Integração

```tsx
// app/ipixuna/page.tsx
import { useEffect, useState } from 'react'

interface PageData {
  title: string
  hero_title: string
  hero_subtitle: string
  hero_image: string
  content: string
}

export default function IpixunaPage() {
  const [page, setPage] = useState<PageData | null>(null)

  useEffect(() => {
    fetch('/api/pages?slug=ipixuna')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPage(data.data)
        }
      })
  }, [])

  if (!page) return <div>Carregando...</div>

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>{page.hero_title}</h1>
        <p>{page.hero_subtitle}</p>
        {page.hero_image && <img src={page.hero_image} />}
      </section>

      {/* Content */}
      <section 
        dangerouslySetInnerHTML={{ __html: page.content }} 
      />
    </div>
  )
}
```

---

## 🔐 Permissões e Segurança

### Acesso ao CMS
- Requer login no `/admin/login`
- Apenas administradores autenticados
- Log de todas as alterações

### Validação
- Slug único
- Campos obrigatórios
- Sanitização de HTML

---

## 🐛 Troubleshooting

### Problema: Página não aparece no site

**Causas possíveis**:
1. Checkbox "Active" não marcado
2. Slug está errado
3. Cache não atualizado

**Soluções**:
```bash
# Verificar se página está ativa
SELECT slug, active FROM pages WHERE slug = 'ipixuna';

# Verificar slug correto
SELECT slug, title FROM pages;

# Limpar cache (se necessário)
# O sistema invalida automaticamente
```

### Problema: Alterações não aparecem

**Causas possíveis**:
1. Cache do navegador
2. Cache do servidor

**Soluções**:
- Limpar cache do navegador (Ctrl+Shift+R)
- Aguardar 15 segundos (cache automático)
- Verificar console para erros

### Problema: HTML não é renderizado

**Causas possíveis**:
1. HTML mal formado
2. Tags não fechadas
3. Caracteres especiais

**Solução**:
```html
<!-- ✅ HTML correto -->
<div>
  <p>Texto</p>
</div>

<!-- ❌ HTML incorreto -->
<div>
  <p>Texto
</div>
```

---

## 📚 Arquivos Envolvidos

### Backend
- `prisma/migrations/create_pages_table.sql` - Tabela do banco
- `app/api/pages/route.ts` - API para listar/criar
- `app/api/pages/[slug]/route.ts` - API para editar/deletar

### Frontend
- `app/admin/pages/page.tsx` - Interface de gerenciamento
- `app/admin/page.tsx` - Dashboard com link para páginas

### Documentação
- `CMS_PAGES_DOCUMENTATION.md` - Este arquivo

---

## ✅ Checklist de Implementação

- [x] Criar tabela `pages` no banco
- [x] Criar API `/api/pages` (GET, POST)
- [x] Criar API `/api/pages/[slug]` (PUT, DELETE)
- [x] Criar interface `/admin/pages`
- [x] Adicionar link no dashboard admin
- [x] Implementar cache automático
- [x] Criar páginas padrão
- [x] Documentação completa

---

## 🚀 Próximas Passos (Opcionais)

### 1. Preview em Tempo Real
Mostrar como a página ficará enquanto edita

### 2. Versionamento
Salvar histórico de alterações com rollback

### 3. Upload de Imagens
Editor WYSIWYG com upload direto

### 4. Templates
Templates prontos para diferentes tipos de página

### 5. Multi-idioma
Suporte para português, inglês, espanhol

---

## 📞 Suporte

Se tiver problemas ou dúvidas:

1. **Verifique a documentação** acima
2. **Consulte os logs** no console do navegador
3. **Teste a API** diretamente via Postman/curl
4. **Entre em contato** com o suporte técnico

---

**Última Atualização**: 15/02/2025 - 17:42  
**Versão**: 1.0.0  
**Status**: ✅ Implementado e pronto para uso