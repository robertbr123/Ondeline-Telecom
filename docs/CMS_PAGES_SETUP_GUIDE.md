# Guia de Configuração do CMS de Páginas

## 🎯 O que foi Implementado

Sistema completo de CMS (Content Management System) para editar qualquer página do site através do painel administrativo `/admin/pages`.

## ✅ O que Já Está Pronto

1. ✅ **API de Gerenciamento** (`/api/pages`)
2. ✅ **Interface de Admin** (`/admin/pages`)
3. ✅ **Cache Automático**
4. ✅ **Documentação Completa**
5. ✅ **Link no Dashboard Admin**

## 📦 Arquivos Criados

### Backend
- `app/api/pages/route.ts` - API para listar/criar páginas
- `app/api/pages/[slug]/route.ts` - API para editar/deletar páginas

### Frontend
- `app/admin/pages/page.tsx` - Interface de gerenciamento
- `app/admin/page.tsx` - Dashboard com link para páginas

### Documentação
- `CMS_PAGES_DOCUMENTATION.md` - Documentação completa de uso

---

## 🚀 Como Configurar (Passo a Passo)

### Passo 1: Criar a Tabela no Banco de Dados

Execute o seguinte SQL no seu banco de dados PostgreSQL:

```sql
-- Criar tabela pages
CREATE TABLE IF NOT EXISTS pages (
  id VARCHAR(255) PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  description TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  keywords TEXT[],
  hero_title VARCHAR(255),
  hero_subtitle TEXT,
  hero_image VARCHAR(500),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_active ON pages(active);
CREATE INDEX IF NOT EXISTS idx_pages_updated_at ON pages(updated_at);

-- Inserir páginas padrão
INSERT INTO pages (id, slug, title, content, hero_title, hero_subtitle, active) VALUES
  ('page-ipixuna', 'ipixuna', 'Internet em Ipixuna', 'Conteúdo da página de Ipixuna', 'Internet de Alta Velocidade em Ipixuna', 'Conecte sua casa ou empresa com a melhor internet da região', true),
  ('page-eirunepe', 'eirunepe', 'Internet em Eirunepe', 'Conteúdo da página de Eirunepe', 'Internet de Alta Velocidade em Eirunepe', 'Conecte sua casa ou empresa com a melhor internet da região', true),
  ('page-itamarati', 'itamarati', 'Internet em Itamarati', 'Conteúdo da página de Itamarati', 'Internet de Alta Velocidade em Itamarati', 'Conecte sua casa ou empresa com a melhor internet da região', true),
  ('page-carauari', 'carauari', 'Internet em Carauari', 'Conteúdo da página de Carauari', 'Internet de Alta Velocidade em Carauari', 'Conecte sua casa ou empresa com a melhor internet da região', true),
  ('page-empresas', 'empresas', 'Soluções para Empresas', 'Conteúdo da página de Empresas', 'Servidores e Cloud Computing para Empresas', 'Infraestrutura robusta, segura e escalável para impulsionar seu negócio', true),
  ('page-coverage', 'coverage', 'Mapa de Cobertura', 'Conteúdo da página de Cobertura', 'Mapa de Cobertura Ondeline', 'Verifique se sua região está coberta pela nossa rede', true),
  ('page-indicar', 'indicar', 'Indique um Amigo', 'Conteúdo da página de Indicação', 'Indique a Ondeline e Ganhe', 'Ganhe benefícios ao indicar nossos serviços para amigos e familiares', true)
ON CONFLICT (slug) DO NOTHING;
```

### Passo 2: Verificar a Configuração

```bash
# Verificar se a tabela foi criada
psql -U onedeline -d onedeline_telecom -c "\d pages"

# Verificar se as páginas foram inseridas
psql -U onedeline -d onedeline_telecom -c "SELECT slug, title, active FROM pages;"
```

### Passo 3: Acessar o Painel de Administração

1. Vá para `http://localhost:3000/admin`
2. Faça login com suas credenciais
3. Clique no card **"Páginas"**
4. Você verá todas as 7 páginas criadas

---

## 🎨 Como Usar o CMS

### Editar uma Página Existente

1. Acesse `/admin/pages`
2. Clique em **"Editar"** na página desejada
3. Faça as alterações necessárias
4. Clique em **"Salvar Página"**
5. As alterações aparecerão imediatamente

### Campos Disponíveis

| Campo | Obrigatório | Descrição |
|-------|-------------|-------------|
| **Slug** | ✅ Sim | URL amigável (ex: ipixuna, empresas) |
| **Title** | ✅ Sim | Título da página |
| **Content** | ✅ Sim | Conteúdo principal (HTML/Markdown) |
| **Description** | Não | Descrição curta |
| **Hero Title** | Não | Título da seção hero |
| **Hero Subtitle** | Não | Subtítulo da seção hero |
| **Hero Image** | Não | URL da imagem do hero |
| **Meta Title** | Não | Título SEO |
| **Meta Description** | Não | Descrição SEO |
| **Keywords** | Não | Palavras-chave (separadas por vírgula) |
| **Active** | Não | Marque para tornar visível |

### Criar uma Nova Página

1. Clique em **"Nova Página"**
2. Preencha os campos obrigatórios
3. Clique em **"Salvar Página"**
4. A página estará disponível na URL `/slug`

### Deletar uma Página

1. Clique no ícone de lixeira 🗑️
2. Confirme a exclusão

---

## 📝 Exemplos de Uso

### Exemplo 1: Atualizar Texto da Página Ipixuna

1. Acesse `/admin/pages`
2. Encontre "Internet em Ipixuna"
3. Clique em "Editar"
4. No campo "Hero Title", mude para:
   ```
   Internet Ultra Rápida em Ipixuna - Agora com 1Gbps
   ```
5. No campo "Content", adicione:
   ```html
   <h2>Novo! Plano Ultra 1Gbps</h2>
   <p>Agora com velocidades de até 1Gbps em Ipixuna!</p>
   <a href="https://wa.me/5592984607721" class="btn">
    Contratar Agora
   </a>
   ```
6. Clique em "Salvar Página"
7. Acesse `/ipixuna` para ver as alterações

### Exemplo 2: Criar Página de Promoção

1. Clique em "Nova Página"
2. Preencha:
   - **Slug**: `promocao-fevereiro`
   - **Title**: `Promoção de Fevereiro`
   - **Hero Title**: `Internet Metade do Preço`
   - **Hero Subtitle**: `Só este mês em todas as cidades`
   - **Content**:
     ```html
     <h2>🎉 Promoção Especial</h2>
     <p>Internet metade do preço apenas este mês!</p>
     <ul>
       <li>Instalação gratuita</li>
       <li>Velocidade garantida</li>
       <li>Suporte 24/7</li>
     </ul>
     <a href="https://wa.me/5592984607721" class="btn">
      Aproveitar Oferta
     </a>
     ```
   - **Active**: `true`
3. Clique em "Salvar Página"
4. A página estará em `/promocao-fevereiro`

### Exemplo 3: Otimizar SEO da Página Empresas

1. Edite a página "Soluções para Empresas"
2. Preencha os campos SEO:
   - **Meta Title**: `Servidores Dedicados e Cloud Computing - Ondeline`
   - **Meta Description**: `Infraestrutura empresarial com SLA 99.9%. Servidores dedicados, cloud computing, backup e muito mais para empresas em todo o Amazonas.`
   - **Keywords**: `servidores, cloud, hosting, empresas, data center, sla`
3. Clique em "Salvar Página"

---

## 🎯 Páginas Padrão Disponíveis

| Slug | Título | URL | Descrição |
|-------|---------|------|------------|
| `ipixuna` | Internet em Ipixuna | `/ipixuna` | Página da cidade de Ipixuna |
| `eirunepe` | Internet em Eirunepe | `/eirunepe` | Página da cidade de Eirunepe |
| `itamarati` | Internet em Itamarati | `/itamarati` | Página da cidade de Itamarati |
| `carauari` | Internet em Carauari | `/carauari` | Página da cidade de Carauari |
| `empresas` | Soluções para Empresas | `/empresas` | Página de serviços empresariais |
| `coverage` | Mapa de Cobertura | `/coverage` | Página de mapa de cobertura |
| `indicar` | Indique um Amigo | `/indicar` | Página de programa de indicação |

---

## 💡 Dicas Importantes

### 1. Sempre Edite Pelo CMS

✅ **Faça assim**: Editar pelo `/admin/pages`
❌ **Evite**: Editar arquivos `.tsx` diretamente

**Por quê?**
- Alterações no CMS são persistentes
- Não precisam de deploy
- Fácil para não-programadores

### 2. Use HTML Validado

```html
<!-- ✅ HTML correto -->
<div>
  <h2>Título</h2>
  <p>Texto</p>
</div>

<!-- ❌ HTML incorreto -->
<div>
  <h2>Título
  <p>Texto
```

### 3. Otimize Imagens

- **Formato**: WebP ou JPG
- **Tamanho**: Máximo 200KB
- **Dimensões**: 1920x1080px ou maiores
- **Compressão**: Use TinyPNG ou similar

### 4. SEO Básico

**Meta Title**: 50-60 caracteres
```
Internet Ipixuna - Ondeline Telecom
```

**Meta Description**: 150-160 caracteres
```
Internet de alta velocidade em Ipixuna. Planos a partir de R$100. Suporte 24/7.
```

**Keywords**: 5-10 palavras
```
internet, wifi, ipixuna, amazonas, provedor, fibra
```

---

## 🔄 Como Funciona o Cache

O sistema usa cache inteligente:

- **TTL**: 15 minutos
- **Invalidação**: Automática ao criar/editar/deletar
- **Benefício**: Site rápido, sempre atualizado

Ao salvar uma página, o cache é limpo automaticamente. Mudanças aparecem imediatamente!

---

## 📚 Documentação Completa

Para mais detalhes, consulte:
- `CMS_PAGES_DOCUMENTATION.md` - Documentação técnica completa

---

## ✅ Checklist de Validação

- [x] APIs criadas (`/api/pages`)
- [x] Interface de admin criada (`/admin/pages`)
- [x] Link adicionado no dashboard
- [x] Cache implementado
- [x] Documentação completa criada
- [ ] **Executar SQL para criar tabela** ← ÚNICA PENDÊNCIA

---

## 🎉 Pronto para Usar!

Depois de executar o SQL acima, você poderá:

1. ✅ Editar qualquer página pelo admin
2. ✅ Criar novas páginas com URLs personalizadas
3. ✅ Alterar conteúdo HTML/Markdown sem código
4. ✅ Configurar SEO (Meta Title, Meta Description, Keywords)
5. ✅ Customizar Hero (Título, Subtítulo, Imagem)
6. ✅ Ativar/Desativar páginas facilmente

Acesse: `/admin/pages` para começar!

---

**Data**: 15/02/2025  
**Status**: ✅ Pronto (apenas executar SQL)  
**Documentação Completa**: `CMS_PAGES_DOCUMENTATION.md`