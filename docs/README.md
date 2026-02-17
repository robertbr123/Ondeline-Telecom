# Ondeline Telecom

Internet de alta velocidade no Amazonas - Ipixuna, Eirunepe, Itamarati e Carauari.

## 📋 Sobre

Ondeline Telecom é um provedor de internet que conecta o interior do Amazonas com serviços de alta qualidade, suporte 24/7 e planos acessíveis a partir de R$ 100/mês.

## 🚀 Tecnologias

- **Frontend**: Next.js 16, React 19, TypeScript
- **Estilização**: Tailwind CSS 4, shadcn/ui
- **Autenticação**: NextAuth.js
- **Banco de Dados**: SQLite (configurável para PostgreSQL/MySQL)
- **Email**: Nodemailer
- **Mapas**: Leaflet, React-Leaflet
- **Validação**: Zod, react-hook-form
- **Análise**: Vercel Analytics

## 📦 Instalação

```bash
# Instalar dependências
npm install
# ou
pnpm install
# ou
yarn install
```

## 🔧 Configuração

1. **Variáveis de Ambiente** - Crie um arquivo `.env.local`:

```env
# URL do site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Autenticação
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials (hash do bcrypt)
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-app
SMTP_FROM=Ondeline <noreply@ondeline.com.br>

# WhatsApp (opcional)
NEXT_PUBLIC_WHATSAPP_NUMBER=5592984607721
```

2. **Gerar hash de senha para admin**:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('sua-senha-aqui', 10));"
```

## 🏃 Executar em Desenvolvimento

```bash
npm run dev
# ou
pnpm dev
```

Acesse [http://localhost:5008](http://localhost:5008)

## 🏗️ Build para Produção

```bash
npm run build
npm start
```

## 📊 Painel de Admin

Acesse `/admin` para gerenciar:
- ✅ Configurações do site (título, descrição, contato)
- ✅ Planos de internet
- ✅ Clientes e leads
- ✅ FAQ
- ✅ Conteúdo das seções

Login padrão (altere em produção):
- Usuário: `admin`
- Senha: `admin123` (gere um novo hash em produção)

## 📁 Estrutura do Projeto

```
ondeline-telecom/
├── app/
│   ├── admin/              # Painel de administração
│   ├── api/                # API routes
│   ├── blog/               # Blog
│   ├── coverage/           # Página de cobertura
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── components/             # Componentes React
├── lib/                    # Utilitários e helpers
├── public/                 # Arquivos estáticos
└── types/                  # TypeScript types
```

## 🔌 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login admin
- `POST /api/auth/logout` - Logout admin

### Site
- `GET /api/site/config` - Obter configurações
- `PUT /api/site/config` - Atualizar configurações

### Planos
- `GET /api/plans` - Listar planos
- `POST /api/plans` - Criar plano
- `PUT /api/plans/[id]` - Atualizar plano
- `DELETE /api/plans/[id]` - Deletar plano

### Leads/Pré-cadastro
- `POST /api/leads` - Criar lead
- `GET /api/leads` - Listar leads (admin)

### FAQ
- `GET /api/faq` - Listar perguntas
- `POST /api/faq` - Criar pergunta
- `PUT /api/faq/[id]` - Atualizar pergunta
- `DELETE /api/faq/[id]` - Deletar pergunta

## 🎨 Personalização

### Temas
O projeto suporta temas claro e escuro. As cores são configuradas em `app/globals.css` usando OKLCH.

### Logo
Substitua `components/logo-ondeline.tsx` com seu próprio componente de logo.

### Imagens
Todas as imagens estão em `public/`. Para SEO e performance, use o componente `next/image`.

## 🚢 Deploy com Dokploy

O projeto está configurado para deploy com Dokploy. Certifique-se de:

1. Adicionar todas as variáveis de ambiente no Dokploy
2. Configurar o banco de dados (SQLite para desenvolvimento, PostgreSQL para produção)
3. Usar Node.js 20+ ou 18+

### Comandos no Dokploy:

```bash
# Build
npm run build

# Start
npm start
```

## 📱 PWA Features

- ✅ Manifest para instalação como app
- ✅ Favicon otimizado
- ✅ Meta tags para SEO
- ✅ Open Graph e Twitter Cards
- ✅ Structured Data (JSON-LD) para SEO local

## ♿ Acessibilidade

- Navegação por teclado
- ARIA labels em elementos interativos
- Contraste de cores WCAG AA
- Alt text em imagens
- Suporte a leitores de tela

## 📈 Performance

- Lazy loading de componentes
- Otimização automática de imagens
- Code splitting dinâmico
- Fontes otimizadas (Google Fonts)
- Animações com GPU acceleration

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da Ondeline Telecom. Todos os direitos reservados.

## 📞 Suporte

- WhatsApp: (92) 98460-7721
- Email: suporte@ondeline.com.br
- Site: www.ondeline.com.br

---

Desenvolvido com ❤️ pela Ondeline Telecom
