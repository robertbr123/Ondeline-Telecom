# 🚀 Ondeline Telecom - Site do Provedor de Internet

> Conectando o Amazonas com internet rápida e confiável.

Site institucional e sistema de gestão para a Ondeline Telecom, provedor de internet do interior do Amazonas.

## 🌐 Páginas do Site

### Páginas Públicas
- **[Home](/)** - Página inicial com todas as seções
- **[Ipixuna](/ipixuna)** - Página da cidade de Ipixuna
- **[Eirunepe](/eirunepe)** - Página da cidade de Eirunepe
- **[Carauari](/carauari)** - Página da cidade de Carauari
- **[Itamarati](/itamarati)** - Página da cidade de Itamarati
- **[Empresas](/empresas)** - Planos para empresas
- **[Cobertura](/coverage)** - Verificador de cobertura
- **[Blog](/blog)** - Blog com artigos e notícias
- **[Indicar](/indicar)** - Programa de indicação de amigos
- **[Status](/status)** - Status dos serviços em tempo real
- **[Trabalhe Conosco](/trabalhe-conosco)** - Vagas de emprego
- **[Privacidade](/privacidade)** - Política de privacidade
- **[Termos](/termos)** - Termos de uso

### Área Administrativa
- **[Admin](/admin)** - Painel administrativo completo com CMS

## 📚 Documentação

Toda a documentação do projeto está organizada na pasta **[docs/](./docs/)**:

- `README.md` - Documentação completa do projeto
- `ADMIN_SETUP.md` - Guia de configuração do admin
- `DEPLOY.md` - Instruções de deploy
- `CMS_PAGES_DOCUMENTATION.md` - Documentação do CMS de páginas
- `GUIA_USO_CMS.md` - Guia de uso do CMS
- `GUIA_EDITOR_HTML.md` - Guia do editor HTML
- `IMPLEMENTACOES_REALIZADAS.md` - Lista de implementações
- `MELHORIAS_IMPLEMENTADAS.md` - Melhorias implementadas
- `VIDEO_MARKETING_GUIDE.md` - Guia de vídeos de marketing
- `BLOG_CONTENT_SUGGESTIONS.md` - Sugestões de conteúdo para blog
- `GOOGLE_MY_BUSINESS_SETUP.md` - Configuração Google My Business

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **UI**: Tailwind CSS + shadcn/ui
- **Editor**: TipTap (editor rich text)
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Deploy**: Dokploy (Docker)

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- pnpm ou npm

### Instalação

```bash
# Instalar dependências
pnpm install

# Configurar banco de dados
cp .env.example .env
# Editar .env com suas credenciais

# Rodar migrações do banco
npx prisma migrate dev

# Iniciar servidor de desenvolvimento
pnpm dev
```

O site estará disponível em `http://localhost:3000`

## 📦 Estrutura do Projeto

```
├── app/                  # Páginas Next.js
│   ├── admin/           # Painel administrativo
│   ├── api/             # Rotas da API
│   ├── blog/            # Blog
│   └── ...             # Outras páginas
├── components/          # Componentes React
├── lib/                # Utilidades e configurações
├── prisma/            # Banco de dados e migrações
├── public/            # Arquivos estáticos
├── scripts/           # Scripts utilitários
├── docs/             # Documentação
└── styles/           # Estilos globais
```

## ✨ Funcionalidades

### Site Público
- ✅ Design moderno e responsivo
- ✅ Verificador de cobertura
- ✅ Blog com CMS
- ✅ Sistema de indicação
- ✅ Status dos serviços em tempo real
- ✅ Trabalhe conosco com formulário
- ✅ Páginas legais (privacidade, termos)
- ✅ Animações e interações

### Sistema Admin
- ✅ CMS completo para conteúdo
- ✅ Gestão de clientes
- ✅ Gestão de planos
- ✅ Gestão de FAQ
- ✅ Gestão de blog posts
- ✅ Gestão de páginas
- ✅ Dashboard com analytics
- ✅ Upload de imagens

## 📞 Contato

- **Telefone**: (92) 98460-7721
- **Email**: contato@ondeline.com.br
- **Website**: https://ondeline.com.br

## 📄 Licença

© 2026 Ondeline Telecom. Todos os direitos reservados.