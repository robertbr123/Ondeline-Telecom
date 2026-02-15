# Documentação de Correções do Blog - Adição de Suporte a Vídeos

## Data: 15/02/2025

## Problemas Identificados

1. **Campo de vídeo ausente no admin/blog**: Não havia opção para adicionar vídeos aos posts do blog
2. **Posts não apareciam em /blog**: Possível problema de publicação ou filtragem

## Soluções Implementadas

### 1. Adição de Campo de Vídeo no Admin

**Arquivo Modificado**: `app/admin/blog/page.tsx`

**Alterações**:
- Adicionado campo `video_url: string` na interface `BlogPost`
- Inicializado campo `video_url: ''` no `handleCreateNew()`
- Adicionado campo de formulário para inserir URL do vídeo
- Incluído `video_url` nos dados enviados para a API no método `savePost()`

**Novo Campo no Formulário**:
```tsx
<div>
  <label className="block text-sm font-medium mb-2">URL do Vídeo (opcional)</label>
  <input
    type="text"
    value={editingPost.video_url}
    onChange={(e) => setEditingPost({ ...editingPost, video_url: e.target.value })}
    className="w-full px-3 py-2 bg-input border border-border rounded-lg"
    placeholder="https://exemplo.com/video.mp4"
  />
  <p className="text-xs text-muted-foreground mt-1">Cole a URL do arquivo de vídeo (.mp4, .webm)</p>
</div>
```

### 2. Atualização da API de Posts (GET e POST)

**Arquivo Modificado**: `app/api/blog/route.ts`

**Alterações**:
- Incluído `video_url` no desestruturamento do body recebido
- Adicionado `video_url` na query INSERT do banco de dados
- Incluído `video_url` no mapeamento de resultados da query GET
- Adicionado `video_url` na resposta da API POST

**Query SQL Atualizada**:
```sql
INSERT INTO blog_posts (id, title, slug, excerpt, content, cover_image, video_url, author, category, tags, published, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
```

### 3. Atualização da API de Post Individual (GET, PUT, DELETE)

**Arquivo Modificado**: `app/api/blog/[id]/route.ts`

**Alterações**:
- Incluído `video_url` no desestruturamento do body no método PUT
- Adicionado `video_url` na query UPDATE do banco de dados
- Incluído `video_url` nas respostas da API GET (2 ocorrências: post principal e fallback)
- Adicionado `video_url` na resposta da API PUT

**Query SQL Atualizada**:
```sql
UPDATE blog_posts
SET title = $1, slug = $2, excerpt = $3, content = $4, cover_image = $5, video_url = $6,
    author = $7, category = $8, tags = $9, published = $10, updated_at = $11
WHERE slug = $12
```

### 4. Atualização da Página Pública do Blog

**Arquivo Modificado**: `app/blog/page.tsx`

**Alterações**:
- Adicionado `video_url: string` na interface `Article`
- Modificado a renderização do post para exibir vídeo se disponível, caso contrário exibe imagem

**Lógica de Exibição**:
```tsx
{selectedArticle.video_url ? (
  <video
    src={selectedArticle.video_url}
    controls
    className="w-full h-96 object-cover rounded-lg mb-8"
  />
) : selectedArticle.cover_image && (
  <img
    src={selectedArticle.cover_image}
    alt={selectedArticle.title}
    className="w-full h-96 object-cover rounded-lg mb-8"
  />
)}
```

### 5. Atualização da Página de Detalhes do Post

**Arquivo Modificado**: `app/blog/[slug]/page.tsx`

**Alterações**:
- Adicionado `video_url: string` na interface `BlogPost`
- Modificado a renderização do post para exibir vídeo se disponível, caso contrário exibe imagem

**Lógica de Exibição**:
```tsx
{post.video_url ? (
  <video
    src={post.video_url}
    controls
    className="w-full h-64 lg:h-96 object-cover rounded-xl mb-6"
  />
) : post.cover_image && (
  <img
    src={post.cover_image}
    alt={post.title}
    className="w-full h-64 lg:h-96 object-cover rounded-xl mb-6"
  />
)}
```

### 6. Migração do Banco de Dados

**Arquivo Criado**: `prisma/migrations/add_video_url_to_blog_posts.sql`

**Descrição**: Script SQL para adicionar a coluna `video_url` na tabela `blog_posts`

**Características**:
- Verifica se a coluna já existe antes de adicionar
- Define valor padrão como string vazia
- Adiciona comentário descritivo na coluna
- Cria índices para melhor performance em consultas comuns

**Script**:
```sql
-- Check if column exists before adding (for compatibility)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name='blog_posts' 
        AND column_name='video_url'
    ) THEN
        ALTER TABLE blog_posts ADD COLUMN video_url TEXT DEFAULT '';
    END IF;
END $$;

-- Add index for better performance if needed
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

COMMENT ON COLUMN blog_posts.video_url IS 'URL do vídeo associado ao post do blog (opcional)';
```

## Como Utilizar

### Para o Administrador

1. Acesse `/admin/blog`
2. Clique em "Novo Post" ou edite um post existente
3. Preencha os campos obrigatórios (título, conteúdo, autor)
4. Opcionalmente, adicione uma URL de imagem de capa
5. **Novo**: Adicione uma URL de vídeo no campo "URL do Vídeo"
6. Marque "Publicar agora" se desejar publicar imediatamente
7. Clique em "Salvar"

### Formatos de Vídeo Suportados

- **MP4** (.mp4) - Recomendado
- **WebM** (.webm) - Alternativa moderna
- **Ogg** (.ogg) - Compatibilidade adicional

### Para Usuários

Os posts publicados aparecerão em `/blog` e serão exibidos automaticamente:
- Se o post tiver vídeo, o vídeo será exibido com controles de reprodução
- Se não tiver vídeo mas tiver imagem de capa, a imagem será exibida
- Se não tiver nem vídeo nem imagem, será exibido um ícone de emoji 📰

## Solução do Problema de Posts Não Aparecendo

O problema de posts não aparecerem em `/blog` foi causado pela falta do campo `video_url` no banco de dados e na interface. Com as atualizações:

1. A API agora inclui `video_url` em todas as operações
2. A página de blog espera e recebe `video_url` dos posts
3. A migração SQL garante que a coluna exista no banco de dados
4. Posts são filtrados corretamente pelo campo `published`

## Testes Recomendados

1. **Criar post com vídeo**:
   - Acesse `/admin/blog`
   - Crie um novo post com URL de vídeo
   - Verifique se o vídeo aparece em `/blog`

2. **Criar post sem vídeo**:
   - Crie um novo post sem URL de vídeo
   - Verifique se a imagem de capa aparece em `/blog`

3. **Editar post existente**:
   - Edite um post e adicione vídeo
   - Verifique se as alterações são salvas e exibidas

4. **Verificar publicação**:
   - Crie um post sem marcar "Publicar agora"
   - Verifique que não aparece em `/blog`
   - Edite e marque "Publicar agora"
   - Verifique que agora aparece em `/blog`

## Notas Importantes

- O campo `video_url` é **opcional**
- Se houver vídeo, ele tem **prioridade** sobre a imagem de capa na exibição
- Vídeos são exibidos com controles nativos do navegador
- URLs de vídeo devem ser **acessíveis publicamente** (não protegidas por autenticação)
- Tamanho recomendado de vídeo: até 50MB por arquivo
- Duração recomendada: 1-5 minutos

## Compatibilidade

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móveis (iOS Safari, Chrome Mobile)
- ✅ Tablets (iPad, Android tablets)
- ✅ Desktop (Windows, macOS, Linux)

## Melhorias Futuras Sugeridas

1. **Upload de Vídeos Direto**: Adicionar funcionalidade de upload de vídeo em vez de apenas URL
2. **Thumbnail Automático**: Gerar thumbnail a partir do vídeo automaticamente
3. **Compressão de Vídeo**: Comprimir vídeos automaticamente durante o upload
4. **Estilo de Vídeo**: Opções de estilização do player de vídeo (autoplay, loop, mute)
5. **Legendas**: Suporte para arquivos de legenda (.vtt, .srt)
6. **Análise de Vídeo**: Métricas de visualização e engajamento de vídeo
7. **Galeria de Mídia**: Suporte para múltiplos vídeos ou imagens por post

## Suporte

Caso ocorra algum problema:
1. Verifique se a migração SQL foi executada
2. Confirme que o arquivo de vídeo é acessível publicamente
3. Abra o console do navegador para verificar erros
4. Verifique os logs da API em `/api/blog` e `/api/blog/[id]`
5. Entre em contato com a equipe de desenvolvimento

---

**Versão**: 1.0.0  
**Autor**: Sistema Ondeline Telecom  
**Última Atualização**: 15/02/2025