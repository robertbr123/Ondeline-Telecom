# 🐘 Configuração do PostgreSQL no Dokploy

## ❌ Erro Atual

O app está falhando com:
```
Error: getaddrinfo ENOTFOUND ondeline-ondeline-f0zpnd
```

Isso acontece porque o `DATABASE_URL` não está configurado corretamente nas variáveis de ambiente do Dokploy.

---

## ✅ Como Configurar no Dokploy

### Passo 1: Acessar o Projeto no Dokploy

1. Acesse seu painel Dokploy
2. Clique no projeto `Ondeline-Telecom`
3. Vá para a aba **Environment Variables**

### Passo 2: Adicionar Variável DATABASE_URL

Clique em **Add Variable** e adicione:

```
Key: DATABASE_URL
Value: postgresql://ondel:Ipx102030@ondeline-ondeline-f0zpnd:5432/site
```

**Formato da Connection String:**
```
postgresql://usuario:senha@host:porta/nome_banco
```

### Passo 3: Verificar Outras Variáveis Obrigatórias

Certifique-se de que estas variáveis também estão configuradas:

```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
NEXTAUTH_URL=https://seu-dominio.com
NEXTAUTH_SECRET=sua-chave-secreta-aqui
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=seu-hash-bcrypt-aqui
NEXT_PUBLIC_WHATSAPP_NUMBER=5592984607721
```

### Passo 4: Redeploy

1. Clique em **Redeploy**
2. Aguarde o build completar
3. O app deve iniciar sem erros

---

## 🔍 Como Gerar Hash da Senha do Admin

### Opção 1: Usando o Script do Projeto

```bash
cd /Users/robertalbino/Documents/GitHub/Ondeline-Telecom
node scripts/generate-admin-hash.js
```

### Opção 2: Online

Acesse: https://bcrypt-generator.com/
- Digite sua senha
- Copie o hash gerado
- Use como valor para `ADMIN_PASSWORD_HASH`

### Opção 3: Node.js

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('sua-senha-aqui', 10));"
```

---

## 🐛 Troubleshooting

### Problema: "The server does not support SSL connections"

**Solução:** Adicione esta variável de ambiente:

```
Key:   DATABASE_SSL
Value: false
```

O PostgreSQL no Dokploy geralmente não usa SSL para conexões internas.

### Problema: "ENOTFOUND" continua

**Solução:** Verifique se o hostname está correto no DATABASE_URL. No Dokploy, o hostname pode ser diferente:
- Se PostgreSQL está no mesmo projeto: Use `postgres` ou `localhost`
- Se PostgreSQL está em outro serviço: Use o nome do serviço Dokploy

### Problema: "Connection refused"

**Solução:** Verifique:
1. PostgreSQL está rodando
2. Porta está correta (geralmente 5432)
3. Usuário e senha estão corretos

### Problema: "Database does not exist"

**Solução:** O banco será criado automaticamente na primeira execução. Se der erro, crie manualmente:

```sql
CREATE DATABASE site;
```

---

## 📝 Exemplo Completo de Variáveis de Ambiente

```env
# Site
NEXT_PUBLIC_SITE_URL=https://ondeline.com.br
NEXTAUTH_URL=https://ondeline.com.br

# PostgreSQL (OBRIGATÓRIO)
DATABASE_URL=postgresql://ondel:Ipx102030@ondeline-ondeline-f0zpnd:5432/site

# SSL do PostgreSQL (se necessário)
# Use 'false' se o PostgreSQL não suporta SSL (comum em ambientes locais/Dokploy)
DATABASE_SSL=false
# PostgreSQL (OBRIGATÓRIO)
DATABASE_URL=postgresql://ondel:Ipx102030@ondeline-ondeline-f0zpnd:5432/site

# SSL do PostgreSQL (necessário para Dokploy)
DATABASE_SSL=false

# Autenticação
NEXTAUTH_SECRET=gerar-com: openssl rand -base64 32
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$r.k/g5yKxZ.xK.KxZ.xK.xK.xK.xK.xK.xK.xK.xK.xK.xK.xK.xK

# Email (Opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-app
SMTP_FROM=Ondeline Telecom <noreply@ondeline.com.br>

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=5592984607721

# Outros (Opcionais)
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your-key-here
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
```

---

## ✅ Como Verificar se Funcionou

Depois do deploy, acesse os logs e procure:

```
✅ Database initialized successfully
```

Se não vir essa mensagem, verifique o DATABASE_URL nos logs de erro.

---

## 🚀 Próximos Passos

1. Configure DATABASE_URL no Dokploy
2. Redeploy o app
3. Acesse `/admin` e faça login com:
   - Usuário: `admin`
   - Senha: A senha que você configurou no hash

---

## 📞 Precisa de Ajuda?

Se ainda tiver problemas, verifique:
1. Logs do build no Dokploy
2. Logs do container em execução
3. Logs do serviço PostgreSQL (se separado)

O app mostrará warnings claros quando DATABASE_URL não está configurado.
