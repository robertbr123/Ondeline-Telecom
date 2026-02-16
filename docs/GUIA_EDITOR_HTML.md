# 🎨 Guia do Editor HTML com Botões Pré-Configurados

## 🎯 O Que É

O editor HTML agora possui **botões pré-configurados** que facilitam muito a criação de páginas! Você não precisa saber HTML de cor - basta clicar nos botões e eles inserem o código para você!

---

## 🚀 Como Acessar

1. Vá para `http://localhost:3000/admin/pages`
2. Clique em **"Editar"** em uma página existente ou **"Nova Página"**
3. No campo **"Conteúdo (HTML)"**, você verá o editor com botões

---

## ✨ Funcionalidades do Editor

### 1. Botão Editar / Pré-visualizar

- **Editar**: Mostra os botões e o código HTML
- **Pré-visualizar**: Mostra como a página vai aparecer no site

**💡 Dica**: Sempre clique em "Pré-visualizar" antes de salvar!

---

### 2. Botões de Formatação de Texto

| Botão | O Que Faz | Código Inserido |
|-------|-----------|-----------------|
| **Negrito** | Texto em negrito | `<strong>Texto</strong>` |
| **Itálico** | Texto em itálico | `<em>Texto</em>` |
| **Sublinhado** | Texto sublinhado | `<u>Texto</u>` |
| **Riscado** | Texto riscado | `<del>Texto</del>` |
| **Código** | Código inline | `<code>código</code>` |

---

### 3. Botões de Títulos

| Botão | O Que Faz | Tamanho |
|-------|-----------|---------|
| **H1** | Título principal | Muito grande |
| **H2** | Título de seção | Grande |
| **H3** | Subtítulo | Médio |

**Exemplo de uso:**
```html
<h1 class="text-3xl font-bold mb-4">Servidores Dedicados</h1>
<h2 class="text-2xl font-bold mb-4">Características</h2>
<h3 class="text-xl font-bold mb-4">Performance</h3>
```

---

### 4. Botões de Estrutura

#### Parágrafo
```html
<p class="mb-4">Seu texto aqui</p>
```

#### Seção
Cria uma seção completa com container:
```html
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4">
    Conteúdo da seção
  </div>
</section>
```

#### Container (Grid)
Cria um grid responsivo:
```html
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  Cards aqui
</div>
```

**Layouts disponíveis:**
- `grid-cols-1`: 1 coluna (mobile)
- `md:grid-cols-2`: 2 colunas (tablet)
- `lg:grid-cols-3`: 3 colunas (desktop)
- `lg:grid-cols-4`: 4 colunas (large desktop)

#### Card
Cria um card completo:
```html
<div className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition">
  <h3 class="text-2xl font-bold mb-4">Título do Card</h3>
  <p class="text-muted-foreground mb-4">Conteúdo do card</p>
  <p class="text-xl font-bold text-primary">Preço</p>
</div>
```

---

### 5. Botões de Listas

#### Lista com Marcadores
```html
<ul class="list-disc pl-4">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

#### Lista Numerada
```html
<ol class="list-decimal pl-4">
  <li>Primeiro passo</li>
  <li>Segundo passo</li>
  <li>Terceiro passo</li>
</ol>
```

#### Citação
```html
<blockquote class="border-l-4 border-primary pl-4 italic">
  Texto da citação
</blockquote>
```

---

### 6. Botões de Links e Imagens

#### Link
Clica no botão, pede:
- URL do link
- Texto do link

Código gerado:
```html
<a href="https://wa.me/5592984607721" class="text-primary underline hover:text-primary/80">
  Texto do link
</a>
```

#### Imagem
Clica no botão, pede:
- URL da imagem
- Descrição (alt text)

Código gerado:
```html
<img src="https://exemplo.com/imagem.jpg" alt="Descrição da imagem" 
     class="max-w-full h-auto rounded-lg" />
```

---

### 7. Botões de Ação (Botões)

#### Botão Primário
```html
<a href="https://wa.me/5592984607721" 
   class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
  Texto do Botão
</a>
```

**Cor do botão**: Cor primária do tema (azul/padrão)

#### Botão Secundário
```html
<a href="#" 
   class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
  Texto do Botão
</a>
```

**Cor do botão**: Fundo claro com borda

---

## 📝 Exemplo Prático: Criar uma Seção de Serviços

### Passo 1: Criar a Seção
1. Clique no botão **"Seção"**
2. Altere o texto "Conteúdo da seção" para o conteúdo desejado

### Passo 2: Adicionar Título
1. Clique no botão **"H2"**
2. Digite "Nossos Serviços"

### Passo 3: Criar Grid de Cards
1. Clique no botão **"Container (Grid)"**
2. Dentro do container, crie 3 cards

### Passo 4: Adicionar Cards
1. Clique no botão **"Card"** 3 vezes
2. Edite o título e conteúdo de cada card

### Passo 5: Adicionar Botão
1. Após o card, clique no botão **"Botão Primário"**
2. Altere o texto para "Saiba Mais"

### Resultado Final:

```html
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4">
    
    <h2 class="text-3xl font-bold mb-4">Nossos Serviços</h2>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition">
        <h3 class="text-2xl font-bold mb-4">Servidor Dedicado</h3>
        <p class="text-muted-foreground mb-4">Performance máxima para sua empresa</p>
        <p class="text-xl font-bold text-primary">R$ 899/mês</p>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition">
        <h3 class="text-2xl font-bold mb-4">Cloud Computing</h3>
        <p class="text-muted-foreground mb-4">Escalar quando precisar</p>
        <p class="text-xl font-bold text-secondary">R$ 299/mês</p>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition">
        <h3 class="text-2xl font-bold mb-4">Hospedagem</h3>
        <p class="text-muted-foreground mb-4">Simples e eficiente</p>
        <p class="text-xl font-bold text-accent">R$ 199/mês</p>
      </div>

    </div>

    <a href="https://wa.me/5592984607721" 
       class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-8">
      Saiba Mais
    </a>

  </div>
</section>
```

---

## 🎯 Dicas Importantes

### 1. Ordem dos Elementos
Sempre use essa ordem:
```
Section → Container → Título → Grid → Cards → Botões
```

### 2. Classes CSS Comuns

| Classe | O Que Faz |
|---------|-----------|
| `py-20` | Padding vertical de 20 unidades (80px) |
| `px-4` | Padding horizontal de 4 unidades (16px) |
| `max-w-7xl` | Largura máxima (1280px) |
| `mx-auto` | Centralizar horizontalmente |
| `gap-8` | Espaço entre elementos (32px) |
| `mb-4` | Margin bottom de 4 unidades (16px) |
| `p-6` | Padding de 6 unidades (24px) |
| `rounded-xl` | Borda arredondada |
| `border border-border` | Borda com cor do tema |
| `bg-card/50` | Fundo do card com 50% de opacidade |
| `hover:border-primary/50` | Borda primária no hover |
| `transition` | Animação suave |

### 3. Cores do Tema

| Cor | Classe |
|-----|--------|
| Primária | `text-primary`, `bg-primary` |
| Secundária | `text-secondary`, `bg-secondary` |
| Acento | `text-accent`, `bg-accent` |
| Muted | `text-muted-foreground`, `bg-muted` |
| Background | `bg-background` |
| Border | `border-border` |

### 4. Tamanhos de Texto

| Tamanho | Classe |
|---------|--------|
| Título H1 | `text-5xl` ou `text-6xl` |
| Título H2 | `text-3xl` ou `text-4xl` |
| Título H3 | `text-2xl` |
| Preço | `text-xl` |
| Texto normal | Texto padrão |
| Texto pequeno | `text-sm` |

---

## 🔄 Como Copiar HTML de Outra Página

1. Abra a página que você quer copiar no navegador
2. Clique com botão direito → "Inspecionar"
3. Selecione o conteúdo HTML
4. Copie (Ctrl+C ou Cmd+C)
5. Vá para o editor do admin
6. Cole no campo de texto (Ctrl+V ou Cmd+V)
7. Clique em "Pré-visualizar" para ver o resultado

---

## ⚠️ Erros Comuns

### Erro: "O HTML não aparece na pré-visualização"

**Causa**: Tags não fechadas

**Solução**: Verifique se todas as tags estão fechadas:
```html
<!-- ❌ Errado -->
<div>Texto

<!-- ✅ Correto -->
<div>Texto</div>
```

### Erro: "O layout está quebrado"

**Causa**: Container faltando

**Solução**: Sempre use container dentro de section:
```html
<!-- ✅ Correto -->
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4">
    Conteúdo aqui
  </div>
</section>
```

### Erro: "Os cards não ficam lado a lado"

**Causa**: Grid faltando

**Solução**: Use grid para alinhar cards:
```html
<!-- ✅ Correto -->
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div className="card">Card 1</div>
  <div className="card">Card 2</div>
  <div className="card">Card 3</div>
</div>
```

---

## 📚 Modelos Prontos

### Hero Section
```html
<section className="relative py-24 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
  <div className="relative max-w-7xl mx-auto px-4">
    <div className="text-center">
      <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Título Principal
      </h1>
      <p class="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
        Subtítulo ou descrição
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://wa.me/5592984607721" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Botão Principal
        </a>
      </div>
    </div>
  </div>
</section>
```

### Seção de Cards
```html
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4">
    <h2 class="text-4xl font-bold mb-4 text-center">Título da Seção</h2>
    <p class="text-xl text-muted-foreground mb-16 text-center">
      Descrição da seção
    </p>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition">
        <h3 class="text-2xl font-bold mb-4">Título do Card</h3>
        <p class="text-muted-foreground mb-4">Descrição do card</p>
        <p class="text-2xl font-bold text-primary">Preço</p>
      </div>
    </div>
  </div>
</section>
```

### CTA Section
```html
<section className="py-20 bg-muted/30">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 class="text-4xl font-bold mb-4">Título do CTA</h2>
    <p class="text-xl text-muted-foreground mb-8">
      Descrição do CTA
    </p>
    <a href="https://wa.me/5592984607721" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
      Ação Principal
    </a>
  </div>
</section>
```

---

## 🎯 Resumo

1. ✅ **Use os botões pré-configurados** - Eles já têm o código correto
2. ✅ **Sempre pré-visualize** antes de salvar
3. ✅ **Use a ordem correta**: Section → Container → Título → Grid → Cards
4. ✅ **Copie modelos** dos exemplos acima
5. ✅ **Teste no navegador** após salvar

---

**Data**: 15/02/2025  
**Status**: ✅ Editor com botões pré-configurados ativo