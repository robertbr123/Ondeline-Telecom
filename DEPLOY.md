# Deploy no Dokploy

Este guia explica como fazer o deploy do projeto Ondeline Telecom no Dokploy.

## Pré-requisitos

- Conta no Dokploy
- Repositório Git (GitHub, GitLab, etc.)
- Conta de email configurada (para envio de notificações)
- Banco de dados (opcional, SQLite já incluído)

## Configuração do Projeto

### 1. Variáveis de Ambiente

No Dokploy, configure as seguintes variáveis de ambiente:

#### Essenciais
```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
NEXTAUTH_SECRET=sua-chave-secreta-aqui
NEXTAUTH_URL=https://seu-dominio.com
```

#### Autenticação (Admin)
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$seu-hash-gerado-com-bcrypt
```

Para gerar o hash da senha:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('sua-senha-aqui', 10));"
```

#### Email (Opcional, mas recomendado)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-app
SMTP_FROM=Ondeline Telecom <noreply@ondeline.com.br>
```

Para Gmail, use uma [Senha de App](https://support.google.com/accounts/answer/185833).

#### WhatsApp (Opcional)
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5592984607721
```

#### Google Maps (Opcional)
```env
NEXT_PUBLIC_GOOGLE_MAPS_KEY=sua-chave-api
```

#### ReCAPTCHA (Opcional)
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=seu-site-key
RECAPTCHA_SECRET_KEY=seu-secret-key
```

### 2. Comandos de Build e Start

No Dokploy, configure:

**Build Command:**
```bash
npm install
npm run build
```

**Start Command:**
```bash
npm start
```

**Nota:** O projeto está configurado para rodar na **porta 3008** automaticamente.

## Processo de Deploy

### Opção 1: Interface Web do Dokploy

1. **Criar Aplicação**
   - Acesse o painel do Dokploy
   - Clique em "Create Application"
   - Dê um nome (ex: `ondeline-telecom`)

2. **Configurar Git**
   - Conecte seu repositório Git
   - Selecione a branch (geralmente `main` ou `master`)

3. **Configurar Variáveis de Ambiente**
   - Vá em "Environment Variables"
   - Adicione todas as variáveis listadas acima
   - **IMPORTANTE**: Não esqueça do `NEXTAUTH_SECRET`!

4. **Configurar Build**
   - **Build Type:** Selecione **Nixpacks** (recomendado) ou **Buildpacks**
     - **Nixpacks** é a melhor opção - detecta automaticamente Next.js
     - Se não disponível, use **Buildpacks** que também funciona bem
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Node Version: 20.x ou 18.x

5. **Configurar Domínio**
   - Em "Domains", adicione seu domínio
   - Configure SSL (certificado HTTPS automático)

6. **Deploy**
   - Clique em "Deploy"
   - Aguarde o processo de build e deploy

### Opção 2: Dokploy CLI

1. **Instalar CLI**
```bash
npm install -g dokploy-cli
```

2. **Login**
```bash
dokploy login
```

3. **Criar e Deployar**
```bash
dokploy create ondeline-telecom \
  --git-url https://github.com/seu-usuario/Ondeline-Telecom \
  --branch main \
  --build-command "npm install && npm run build" \
  --start-command "npm start" \
  --port 3008 \
  --env-file .env
```

**Nota:** A porta padrão é **3008**.

## Pós-Deploy

### 1. Verificar Deploy

- Acesse seu domínio
- Verifique se todas as páginas carregam corretamente
- Teste o formulário de pré-cadastro

### 2. Acessar Painel Admin

1. Acesse `https://seu-dominio.com/admin/login`
2. Login com as credenciais configuradas
3. Verifique se tudo está funcionando

### 3. Testar Funcionalidades

- ✅ Formulário de pré-cadastro
- ✅ Envio de email de notificação
- ✅ Dashboard de estatísticas
- ✅ Gerenciamento de planos
- ✅ Gerenciamento de leads
- ✅ Configurações do site

## Backup e Persistência de Dados

### SQLite (Padrão)

O banco de dados SQLite é criado automaticamente em `data/db.sqlite`.

**Importante:** Em um ambiente de container como Dokploy, você precisa:

1. **Volume Persistente:**
   - Configure um volume no Dokploy para o diretório `./data`
   - Isso garante que os dados persistam entre deploys

2. **Backup Manual:**
   - Acesse o container via SSH (se disponível)
   - Copie `data/db.sqlite` periodicamente
   - Armazene backups em local ou serviço de nuvem

### PostgreSQL (Recomendado para Produção)

Para maior escalabilidade, use PostgreSQL:

1. **Criar Banco:**
   - No Dokploy, crie um serviço PostgreSQL
   - Ou use um serviço externo (Neon, Supabase, Railway, etc.)

2. **Configurar Variável:**
```env
DATABASE_URL=postgresql://usuario:senha@host:porta/banco
```

3. **Migrar Dados:**
   - Exporte do SQLite
   - Importe para PostgreSQL
   - Atualize `lib/db.ts` para usar PostgreSQL em vez de SQLite

## Monitoramento e Logs

### Acessar Logs

- No painel do Dokploy, vá em "Logs"
- Verifique erros de runtime
- Monitore lentidão ou timeouts

### Métricas

- Acompanhe uso de CPU, memória e disco
- Configure alertas para problemas
- Monitore tempo de uptime

## Atualizações

### Processo de Update

1. **Fazer mudanças no código**
2. **Commit e push:**
```bash
git add .
git commit -m "feat: nova funcionalidade"
git push
```

3. **Dokploy irá fazer deploy automático** se configurado

Ou manual:
```bash
dokploy redeploy ondeline-telecom
```

## Segurança

### Checklist de Produção

- [ ] Alterar senha admin padrão
- [ ] Usar HTTPS (SSL)
- [ ] Configurar firewall se necessário
- [ ] Backups automatizados
- [ ] Monitoramento ativo
- [ ] Rate limiting configurado
- ] Senhas fortes para email e banco
- [ ] Variáveis de ambiente não expostas

### Proteção de Rotas

O middleware já protege:
- `/admin/*` - Apenas usuários autenticados
- `/api/*` (exceto leads e auth) - Apenas usuários autenticados

## Troubleshooting

### Erro: "Cannot connect to database"

- Verifique se o volume está configurado
- Verifique se `DATABASE_URL` está correta
- Verifique permissões do diretório `data/`

### Erro: "Email not sending"

- Verifique credenciais SMTP
- Para Gmail, use senha de app
- Verifique se porta (587) está correta
- Verifique se firewall permite saída de email

### Erro: "Build failed"

- Verifique se todas as dependências estão no package.json
- Verifique Node version
- Verifique memory limits do container
- Verifique logs de build no Dokploy

### Site lento

- Otimize imagens (use next/image)
- Configure caching no Dokploy
- Use CDN se disponível
- Verifique performance do banco de dados

## Suporte

- **Documentação Dokploy:** https://dokploy.com/docs
- **Documentação Next.js:** https://nextjs.org/docs
- **Comunidade:** GitHub Discussions

## Custos Estimados (Dokploy)

- **Free Tier:** Aproveite o plano gratuito se possível
- **Produção Recomendado:**
  - CPU: 2 vCPUs
  - RAM: 2-4 GB
  - SSD: 20 GB+
  - Custo estimado: $10-30/mês

## Scripts Úteis

### Backup do Banco
```bash
# Via SSH no container
cp data/db.sqlite data/db.sqlite.backup.$(date +%Y%m%d)
```

### Restore do Banco
```bash
# Via SSH no container
cp data/db.sqlite.backup.YYYYMMDD data/db.sqlite
```

### Limpar Cache
```bash
rm -rf .next
npm run build
```

---

**Pronto!** Seu site Ondeline Telecom está configurado para deploy no Dokploy.

Se precisar de ajuda, verifique os logs no painel do Dokploy ou entre em contato com o suporte.
