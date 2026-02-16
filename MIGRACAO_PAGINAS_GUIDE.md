# 🔄 Guia de Migração de Páginas para o CMS

## 🎯 Objetivo

Migrar todas as páginas existentes (ipixuna, eirunepe, itamarati, carauari, coverage, empresas, indicar) para o banco de dados do CMS, permitindo que você as edite pelo painel administrativo sem tocar no código!

---

## 📋 Pré-requisitos

### 1. Banco de Dados Configurado
✅ Execute o SQL do arquivo `CMS_PAGES_SETUP_GUIDE.md` primeiro

### 2. Credenciais do Banco
O script precisa de credenciais do PostgreSQL. Configure as variáveis de ambiente ou edite o script:

```javascript
// No arquivo scripts/migrate-existing-pages-to-cms.js

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'ondeline',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
};
```

---

## 🚀 Como Usar a Migração

Você tem **DUAS OPÇÕES** para migrar as páginas:

---

### 🎯 OPÇÃO 1: API via Navegador (Mais Fácil!)

✅ **Recomendada** - Mais simples e rápida

#### Passo 1: Apenas acesse a URL
```
http://localhost:3008/api/migrate-pages
```

#### Passo 2: Veja o resultado
A API vai mostrar um JSON com o resultado:

```json
{
  "success": true,
  "message": "Migração concluída!",
  "summary": {
    "total": 7,
    "migrated": 7,
    "skipped": 0,
    "errors": 0
  },
  "results": [
    {
      "slug": "ipixuna",
      "title": "Internet em Ipixuna",
      "success": true,
      "message": "Página \"ipixuna\" migrada com sucesso!",
      "existed": false
    },
    {
      "slug": "eirunepe",
      "title": "Internet em Eirunepé",
      "success": true,
      "message": "Página \"eirunepé\" migrada com sucesso!",
      "existed": false
    }
    // ... e assim por diante
  ]
}
```

#### Passo 3: Verificar no Admin
Vá para `http://localhost:3008/admin/pages` e confirme que as páginas apareceram!

---

### 💻 OPÇÃO 2: Script Node.js (Avançado)

Para usuários mais avançados que preferem linha de comando.

#### Passo 1: Configurar Credenciais

**Opção A - Variáveis de Ambiente:**
```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=ondeline
export DB_USER=postgres
export DB_PASSWORD=sua_senha
```

**Opção B - Editar o Script:**
Abra `scripts/migrate-existing-pages-to-cms.js` e altere as credenciais diretamente.

#### Passo 2: Executar o Script

```bash
node scripts/migrate-existing-pages-to-cms.js
```

#### Passo 3: Verificar o Resultado

O script vai mostrar:
```
🚀 Iniciando migração de páginas para o CMS...

📡 Conectando ao banco de dados...
✓ Conectado ao banco de dados

📄 Migrando: ipixuna
✓ Página "ipixuna" migrada com sucesso!

📄 Migrando: eirunepe
✓ Página "eirunepe" migrada com sucesso!

📄 Migrando: itamarati
✓ Página "itamarati" migrada com sucesso!

📄 Migrando: carauari
✓ Página "carauari" migrada com sucesso!

📄 Migrando: coverage
✓ Página "coverage" migrada com sucesso!

📄 Migrando: indicar
✓ Página "indicar" migrada com sucesso!

📄 Migrando: empresas
✓ Página "empresas" migrada com sucesso!

✅ Migração concluída com sucesso!

📊 Resumo:
  - Páginas processadas: 7
  - Acesse /admin/pages para ver as páginas
  - Editando no admin, as alterações são aplicadas imediatamente

📡 Conexão com banco encerrada
```

---

## 📄 Páginas Que Serão Migradas

| Slug | Título | Arquivo Original |
|-------|---------|-----------------|
| `ipixuna` | Internet em Ipixuna | `app/ipixuna/page.tsx` |
| `eirunepe` | Internet em Eirunepé | `app/eirunepe/page.tsx` |
| `itamarati` | Internet em Itamarati | `app/itamarati/page.tsx` |
| `carauari` | Internet em Carauari | `app/carauari/page.tsx` |
| `coverage` | Áreas de Cobertura | `app/coverage/page.tsx` |
| `indicar` | Indique e Ganhe | `app/indicar/page.tsx` |
| `empresas` | Soluções para Empresas | `app/empresas/page.tsx` |

---

## 🎨 O Que o Script Faz

### 1. Lê o Arquivo da Página
O script lê o arquivo `.tsx` da página e extrai o JSX/HTML.

### 2. Cria HTML Completo
Adiciona automaticamente:
- ✅ **Hero Section** com título e subtítulo
- ✅ **Botões de CTA** (WhatsApp)
- ✅ **Container** responsivo
- ✅ **CTA Section** final
- ✅ **Estilos** do Tailwind CSS

### 3. Salva no Banco
Insere o conteúdo na tabela `pages` com todos os campos preenchidos:
- Slug
- Título
- Conteúdo (HTML completo)
- Descrição
- Meta Title
- Meta Description
- Hero Title
- Hero Subtitle
- Status (ativo)

### 4. Evita Duplicatas
Se a página já existe no banco, o script **pula** e não cria duplicata.

---

## 🔧 Como O Script Funciona

### Extrair HTML do JSX

O script usa expressões regulares para encontrar o JSX retornado:

```javascript
// Pattern 1: Return direto com HTML
/return\s*\(\s*<div[^>]*>([\s\S]*?)<\/div>\s*\)/

// Pattern 2: Return com múltiplos elementos
/return\s*\(([\s\S]*?)\)/

// Pattern 3: Fragmento
/return\s*<\>\s*([\s\S]*?)\s*<\/>/
```

### Criar HTML Completo

```javascript
function createCompleteHtml(pageData, rawHtml) {
  return `
<!-- Hero Section -->
<section className="relative py-24 overflow-hidden">
  <!-- Título principal -->
  <!-- Subtítulo -->
  <!-- Botões -->
</section>

<!-- Conteúdo da Página -->
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    ${rawHtml}  <!-- Conteúdo extraído do arquivo -->
  </div>
</section>

<!-- CTA Section -->
<section className="py-20 bg-muted/30">
  <!-- Botão de ação final -->
</section>
  `.trim();
}
```

### Salvar no Banco

```javascript
const insertQuery = `
  INSERT INTO pages (
    slug, title, content, description, 
    meta_title, meta_description, keywords,
    hero_title, hero_subtitle, hero_image,
    active, created_at, updated_at
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
`;
```

---

## ✅ Após a Migração

### 1. Verificar no Admin
Vá para `http://localhost:3000/admin/pages`

Você deve ver todas as 7 páginas listadas:
- ✓ Ipixuna
- ✓ Eirunepé
- ✓ Itamarati
- ✓ Carauari
- ✓ Áreas de Cobertura
- ✓ Indique e Ganhe
- ✓ Soluções para Empresas

### 2. Editar uma Página
1. Clique em **"Editar"** em qualquer página
2. Use o **Editor HTML com Botões Pré-Configurados**
3. Faça as alterações desejadas
4. Clique em **"Pré-visualizar"** para ver como fica
5. Clique em **"Salvar Página"**

### 3. Verificar no Site
Vá para a URL da página (ex: `/ipixuna`)
As alterações serão aplicadas **imediatamente**!

---

## 🔄 Como Atualizar Páginas Depois

### Método Recomendado: Pelo Admin
✅ **Sempre edite pelo admin** (`/admin/pages`)

### Motivos:
1. ✅ Alterações são persistentes no banco
2. ✅ Não precisa de deploy
3. ✅ Fácil para não-programadores
4. ✅ Cache é invalidado automaticamente
5. ✅ Histórico de alterações

### Método Alternativo: Editar Arquivos
❌ **Não recomendado** após a migração

Se você editar os arquivos `.tsx` diretamente:
- As alterações não serão salvas no banco
- As páginas mostrarão o conteúdo antigo do banco
- Você precisa atualizar o banco manualmente

---

## 🛠️ Solução de Problemas

### Problema: "Connection refused"

**Causa**: Banco de dados não está rodando

**Solução**:
```bash
# Verificar se o PostgreSQL está rodando
sudo systemctl status postgresql

# Iniciar se não estiver
sudo systemctl start postgresql
```

### Problema: "password authentication failed"

**Causa**: Senha incorreta

**Solução**:
1. Verifique a senha no arquivo do script
2. Ou use variáveis de ambiente:
   ```bash
   export DB_PASSWORD=sua_senha_correta
   ```

### Problema: "relation 'pages' does not exist"

**Causa**: Tabela `pages` não foi criada

**Solução**:
1. Execute o SQL do arquivo `CMS_PAGES_SETUP_GUIDE.md`
2. Execute o script de migração novamente

### Problema: "Página já existe no banco"

**Causa**: A página já foi migrada antes

**Solução**:
- ✅ Isso é normal! O script evita duplicatas.
- Se quiser atualizar, edite pelo admin.

### Problema: "Erro ao ler arquivo"

**Causa**: Arquivo não existe ou caminho errado

**Solução**:
1. Verifique se o arquivo existe no caminho especificado
2. Verifique se o caminho está correto no script

---

## 📊 Resumo do Processo

### Usando a API via Navegador (Opção 1):
```
1. Execute o SQL do CMS_PAGES_SETUP_GUIDE.md
   ↓
2. Acesse: http://localhost:3008/api/migrate-pages
   ↓
3. Veja o resultado JSON
   ↓
4. Acesse: http://localhost:3008/admin/pages
   ↓
5. Edite as páginas pelo admin usando o editor HTML
   ↓
6. Pronto! Alterações aplicadas imediatamente
```

### Usando o Script Node.js (Opção 2):
```
1. Execute o SQL do CMS_PAGES_SETUP_GUIDE.md
   ↓
2. Configure as credenciais do banco
   ↓
3. Execute: node scripts/migrate-existing-pages-to-cms.js
   ↓
4. Acesse: http://localhost:3008/admin/pages
   ↓
5. Edite as páginas pelo admin usando o editor HTML
   ↓
6. Pronto! Alterações aplicadas imediatamente
```

---

## ❓ Qual Opção Escolher?

| Opção | Quando Usar | Vantagens |
|-------|-------------|------------|
| **API via Navegador** | Para a maioria dos usuários | ✅ Mais simples<br>✅ Apenas acessar a URL<br>✅ Resultado em JSON<br>✅ Não precisa de terminal |
| **Script Node.js** | Para usuários avançados | ✅ Mais controle<br>✅ Pode personalizar<br>✅ Bom para automação<br>✅ Logs detalhados |

**Recomendação**: Use a **API via Navegador** (Opção 1) - é muito mais simples!

---

## 🎯 Próximos Passos

### Após a Migração

1. **Verificar no Admin**
   - Acesse `/admin/pages`
   - Confirme que todas as páginas aparecem

2. **Testar Edição**
   - Edite uma página
   - Use os botões pré-configurados
   - Salve e veja no site

3. **Ajustar Conteúdo**
   - Use o editor HTML para melhorar o conteúdo
   - Adicione imagens, links, botões
   - Personalize conforme necessário

4. **Customizar SEO**
   - Edite Meta Title
   - Edite Meta Description
   - Adicione Keywords

5. **Adicionar Novas Páginas**
   - Clique em "Nova Página"
   - Use os modelos do `GUIA_EDITOR_HTML.md`

---

## 📚 Documentação Relacionada

- **`GUIA_EDITOR_HTML.md`** - Como usar o editor HTML
- **`GUIA_USO_CMS.md`** - Como usar o CMS
- **`CMS_PAGES_DOCUMENTATION.md`** - Documentação técnica
- **`CMS_PAGES_SETUP_GUIDE.md`** - SQL para criar tabela

---

## 💡 Dicas Importantes

### 1. Backup Antes de Migrar
```bash
# Backup do banco de dados
pg_dump -U postgres -d ondeline > backup.sql
```

### 2. Testar em Desenvolvimento
- Execute o script primeiro em ambiente de desenvolvimento
- Verifique se tudo está funcionando
- Depois execute em produção

### 3. Atualizar Links Internos
- Se houver links entre páginas, atualize após a migração
- Verifique se todos os links funcionam corretamente

### 4. Monitorar Performance
- O cache é invalidado automaticamente ao editar
- Monitore se o site está rápido após as alterações

---

**Data**: 15/02/2025  
**Status**: ✅ Script de migração pronto para uso  
**Próximo passo**: 
1. Execute o SQL do `CMS_PAGES_SETUP_GUIDE.md`
2. Acesse `http://localhost:3008/api/migrate-pages` para migrar as páginas
3. Acesse `http://localhost:3008/admin/pages` para ver e editar as páginas
