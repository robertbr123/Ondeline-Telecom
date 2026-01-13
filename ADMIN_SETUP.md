# Como Gerar Credencial de Admin

Este guia explica como gerar credenciais de administrador seguras para usar no seu projeto.

## 🚀 Método 1: Usando o Script Automático (Recomendado)

### Passo 1: Instalar Dependências

```bash
npm install
```

### Passo 2: Executar o Script

```bash
node scripts/generate-admin-hash.js
```

### Passo 3: Seguir as Instruções

O script vai perguntar:
1. **Nome de usuário** (ex: `admin`, `robert`, `gerente`)
2. **Senha** (mínimo 6 caracteres)

### Exemplo de Saída:

```
=== Gerador de Hash para Admin - Ondeline Telecom ===

Digite o nome de usuário (ex: admin): robert
Digite a senha: minha-senha-segura123

✅ Hash gerado com sucesso!

─────────────────────────────────────
Usuário: robert
Hash da senha: $2a$10$abc123xyz456...
─────────────────────────────────────

Copie o hash acima e use no Dokploy como:
ADMIN_USERNAME=robert
ADMIN_PASSWORD_HASH=$2a$10$abc123xyz456...

Ou adicione ao seu arquivo .env.local
```

### Passo 4: Usar as Credenciais

#### Para Deploy no Dokploy:
1. Vá em **Environment Variables**
2. Adicione as duas variáveis geradas:
   ```
   ADMIN_USERNAME=robert
   ADMIN_PASSWORD_HASH=$2a$10$abc123xyz456...
   ```
3. **IMPORTANTE:** Não use o usuário/senha padrão `admin/admin123`

#### Para Desenvolvimento Local:
1. Crie ou edite o arquivo `.env.local`
2. Adicione as variáveis:
   ```env
   ADMIN_USERNAME=robert
   ADMIN_PASSWORD_HASH=$2a$10$abc123xyz456...
   ```
3. Reinicie o servidor: `npm run dev`

---

## 🔧 Método 2: Usando Node.js Diretamente

Se preferir, pode rodar um comando único:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log('Hash:', bcrypt.hashSync('sua-senha-aqui', 10));"
```

Substitua `sua-senha-aqui` pela senha desejada.

---

## 📱 Método 3: Online Hash Generator (Alternativa)

Se quiser usar uma ferramenta online:

1. Acesse: https://bcrypt-generator.com/
2. Digite sua senha
3. Selecione **Rounds: 10**
4. Clique em **Generate Hash**
5. Copie o hash gerado
6. Use as variáveis explicadas acima

⚠️ **Atenção:** Evite usar ferramentas online para senhas sensíveis em produção.

---

## 🔐 Credenciais Padrão do Sistema

O banco de dados já vem com um usuário criado automaticamente:

- **Usuário:** `admin`
- **Senha:** `admin123`

⚠️ **AVISO DE SEGURANÇA:**
- Use essas credenciais APENAS para teste inicial
- **NUNCA** use em produção
- Gere novas credenciais seguindo os métodos acima

---

## ✅ Checklist de Segurança

### Para Desenvolvimento:
- [ ] Gerou hash com sua própria senha
- [ ] Configurou `.env.local` com as novas credenciais
- [ ] Testou login em `/admin/login`

### Para Produção (Dokploy):
- [ ] Gerou hash com senha forte
- [ ] Configurou variáveis no Dokploy
- [ ] NÃO usou `admin/admin123`
- [ ] Senha tem pelo menos 12 caracteres
- [ ] Senha inclui letras, números e símbolos
- [ ] Salvou as credenciais em local seguro

---

## 📝 Dicas de Senhas Fortes

### ✅ Boas práticas:
- Mínimo 12 caracteres
- Misture letras maiúsculas e minúsculas
- Inclua números e símbolos
- Evite palavras comuns
- Não use datas de nascimento
- Não repita senhas de outros serviços

### Exemplos (não use estes exatamente):
```
❌ senha123          - muito fraca
❌ admin              - muito fraca
❌ 12345678           - muito fraca
✅ Tr@v3!2025$Ondeline    - forte
✅ K#mP@9xvL!nQ$z     - muito forte
```

---

## 🔄 Como Alterar Senha Depois

### Método 1: Via Admin Panel (Recomendado)
1. Faça login com credenciais atuais
2. No futuro, você pode implementar uma página "Alterar Senha"

### Método 2: Via Banco de Dados
Se precisar alterar diretamente no SQLite:

```bash
# Acesse o SQLite
sqlite3 data/db.sqlite

# Atualize a senha
UPDATE admin_users 
SET password_hash = '$2a$10$NOVO_HASH_AQUI' 
WHERE username = 'admin';

# Saia
.quit
```

### Método 3: Via API (Futuro)
Você pode criar um endpoint API para alterar senha:
```
POST /api/admin/change-password
```

---

## 🐛 Solução de Problemas

### Problema: "bcryptjs is not defined"
**Solução:** Execute `npm install` primeiro

### Problema: Hash muito longo
**Solução:** Normal! Hashes bcrypt sempre são longos (60 caracteres)

### Problema: Login não funciona com novas credenciais
**Solução:**
1. Verifique se copiou o hash completo
2. Verifique se variável é `ADMIN_PASSWORD_HASH` (com _HASH no final)
3. Reinicie o servidor após alterar `.env.local`
4. No Dokploy, faça um novo deploy após alterar variáveis

### Problema: Esqueci a senha
**Solução:**
- Desenvolvimento: Delete `data/db.sqlite` e reinicie (será recriado com admin/admin123)
- Produção: Use SQLite para gerar novo hash e atualizar banco diretamente

---

## 📚 Referências

- **Documentação Bcrypt:** https://www.npmjs.com/package/bcryptjs
- **Segurança de Senhas:** OWASP Password Storage Cheat Sheet
- **Gerador Online:** https://bcrypt-generator.com/

---

## 🎯 Resumo Rápido

### Para usar AGORA:

```bash
# 1. Instale dependências
npm install

# 2. Rode o script
node scripts/generate-admin-hash.js

# 3. Digite suas credenciais
Usuário: seu-usuario
Senha: sua-senha-segura

# 4. Copie as variáveis geradas
# Use no Dokploy ou .env.local
```

Pronto! 🎉 Agora você tem credenciais seguras para seu admin panel.
