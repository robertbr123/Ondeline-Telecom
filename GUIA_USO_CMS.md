# 📖 Guia Prático - Como Usar o CMS para Editar Páginas

## 🎯 O Que Você Precisa Saber

A página `/empresas` AGORA está configurada para buscar TODO o conteúdo do banco de dados do CMS. Isso significa que você pode editar ABSOLUTAMENTE TUDO através do painel administrativo!

---

## 🚀 Passo a Passo Completo

### Passo 1: Acessar o Painel de Admin

1. Vá para `http://localhost:3000/admin`
2. Faça login com suas credenciais
3. Clique no card **"Páginas"**

### Passo 2: Encontrar a Página "Soluções para Empresas"

1. Na lista de páginas, encontre: **Soluções para Empresas** (slug: empresas)
2. Clique no botão **"Editar"**

### Passo 3: Copiar o HTML Atual da Página

**Opção A - Usando o navegador:**
1. Abra uma nova aba
2. Vá para `http://localhost:3000/empresas`
3. Clique com botão direito na página
4. Selecione "Inspecionar" ou "Inspecionar Elemento"
5. Clique na parte principal do conteúdo (dentro da div principal)
6. Copie todo o HTML interno

**Opção B - Vou te ajudar com o HTML:**

Aqui está um HTML COMPLETO e ESTRUTURADO da página `/empresas`. Você pode copiar e colar este HTML no campo "Conteúdo (HTML/Markdown)" do CMS:

```html
<!-- Hero Section -->
<section className="relative py-24 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Servidores e Cloud Computing para Empresas
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
        Infraestrutura robusta, segura e escalável para impulsionar seu negócio. Servidores dedicados, cloud computing e soluções corporativas com SLA garantido.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://wa.me/5592984607721" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Falar com Especialista
        </a>
        <a href="#contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          Baixar Catálogo
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Services Section -->
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">Nossos Serviços</h2>
      <p className="text-xl text-muted-foreground">
        Soluções completas de infraestrutura para empresas de todos os tamanhos
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Servidores Dedicados -->
      <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition">
        <h3 className="text-2xl font-bold mb-4">Servidores Dedicados</h3>
        <p className="text-muted-foreground mb-4">
          Servidores físicos dedicados para sua empresa com performance máxima e controle total.
        </p>
        <ul className="space-y-2 mb-4 text-sm">
          <li>✅ Hardware de ponta (Intel Xeon, AMD EPYC)</li>
          <li>✅ Até 128GB de RAM</li>
          <li>✅ SSD NVMe de alta performance</li>
          <li>✅ Conexão de até 10Gbps</li>
          <li>✅ IP dedicado</li>
          <li>✅ Acesso remoto completo</li>
        </ul>
        <p className="text-2xl font-bold text-primary">A partir de R$ 899/mês</p>
      </div>

      <!-- Cloud Computing -->
      <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-secondary/50 transition">
        <h3 className="text-2xl font-bold mb-4">Cloud Computing</h3>
        <p className="text-muted-foreground mb-4">
          Infraestrutura em nuvem escalável para crescer junto com seu negócio.
        </p>
        <ul className="space-y-2 mb-4 text-sm">
          <li>✅ Servidores virtuais (VPS)</li>
          <li>✅ Escalabilidade elástica</li>
          <li>✅ Backup automatizado diário</li>
          <li>✅ Balanceamento de carga</li>
          <li>✅ SLA de 99.9%</li>
          <li>✅ Pague apenas o que usar</li>
        </ul>
        <p className="text-2xl font-bold text-secondary">A partir de R$ 299/mês</p>
      </div>

      <!-- Hospedagem e Banco de Dados -->
      <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-accent/50 transition">
        <h3 className="text-2xl font-bold mb-4">Hospedagem e Banco de Dados</h3>
        <p className="text-muted-foreground mb-4">
          Soluções completas de hospedagem com bancos de dados gerenciados.
        </p>
        <ul className="space-y-2 mb-4 text-sm">
          <li>✅ MySQL, PostgreSQL, MongoDB</li>
          <li>✅ Criação automática de backups</li>
          <li>✅ Alta disponibilidade</li>
          <li>✅ Suporte 24/7 especializado</li>
          <li>✅ Otimização de performance</li>
          <li>✅ Replicação de dados</li>
        </ul>
        <p className="text-2xl font-bold text-accent">A partir de R$ 199/mês</p>
      </div>

      <!-- CDN e Hosting -->
      <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition">
        <h3 className="text-2xl font-bold mb-4">CDN e Hosting</h3>
        <p className="text-muted-foreground mb-4">
          Distribuição global de conteúdo para máxima velocidade em todo o Brasil.
        </p>
        <ul className="space-y-2 mb-4 text-sm">
          <li>✅ CDN global com 50+ PoPs</li>
          <li>✅ Cache inteligente</li>
          <li>✅ SSL gratuito</li>
          <li>✅ DDoS Protection</li>
          <li>✅ Web Application Firewall</li>
          <li>✅ Analytics em tempo real</li>
        </ul>
        <p className="text-2xl font-bold text-primary">A partir de R$ 149/mês</p>
      </div>

      <!-- Segurança Avançada -->
      <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-secondary/50 transition">
        <h3 className="text-2xl font-bold mb-4">Segurança Avançada</h3>
        <p className="text-muted-foreground mb-4">
          Proteção completa para sua infraestrutura e dados empresariais.
        </p>
        <ul className="space-y-2 mb-4 text-sm">
          <li>✅ Firewall gerenciado</li>
          <li>✅ Monitoramento 24/7</li>
          <li>✅ Proteção contra ataques DDoS</li>
          <li>✅ SSL/TLS Avançado</li>
          <li>✅ Auditoria de segurança</li>
          <li>✅ Compliance LGPD</li>
        </ul>
        <p className="text-2xl font-bold text-secondary">A partir de R$ 399/mês</p>
      </div>

      <!-- Internet Corporativa Dedicada -->
      <div className="p-6 rounded-xl border border-border bg-card/50 hover:border-accent/50 transition">
        <h3 className="text-2xl font-bold mb-4">Internet Corporativa Dedicada</h3>
        <p className="text-muted-foreground mb-4">
          Conexão de internet dedicada com garantia de velocidade e estabilidade.
        </p>
        <ul className="space-y-2 mb-4 text-sm">
          <li>✅ SLA garantido de 99.9%</li>
          <li>✅ IP fixo dedicado</li>
          <li>✅ Suporte técnico prioritário</li>
          <li>✅ Monitoramento proativo</li>
          <li>✅ Banda simétrica</li>
          <li>✅ Instalação em 48h</li>
        </ul>
        <p className="text-2xl font-bold text-accent">Sob consulta</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section className="py-20 bg-muted/30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-4xl font-bold mb-4">Precisa de uma solução personalizada para sua empresa?</h2>
    <p className="text-xl text-muted-foreground mb-8">
      Nossa equipe de especialistas está pronta para criar a solução ideal para você
    </p>
    <a href="https://wa.me/5592984607721" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
      Falar com Consultor
    </a>
  </div>
</section>
```

### Passo 4: Colar o HTML no CMS

1. No painel de edição da página "Soluções para Empresas"
2. Encontre o campo **"Conteúdo (HTML/Markdown)"**
3. Cole o HTML que você copiou
4. **IMPORTANTE**: Não altere os outros campos ainda (Hero Title, Subtitle, etc.)
5. Clique em **"Salvar Página"**

### Passo 5: Verificar o Resultado

1. Vá para `http://localhost:3000/empresas`
2. A página deve mostrar TODO o conteúdo que você colou no CMS
3. Se aparecer uma mensagem de "Página não encontrada", significa que o banco de dados ainda não está configurado

---

## ⚠️ IMPORTANTE - Primeiro Passo: Configurar o Banco de Dados

Antes de tudo, você precisa executar o SQL para criar a tabela no banco. Veja o arquivo `CMS_PAGES_SETUP_GUIDE.md` para o SQL completo.

**Resumo rápido:**
1. Abra seu banco de dados PostgreSQL
2. Execute o SQL que está em `CMS_PAGES_SETUP_GUIDE.md`
3. Depois disso, o CMS estará 100% funcional

---

## 💡 Dicas Importantes

### 1. Sempre Use o CMS para Editar

✅ **FAÇA ASSIM**:
- Edite pelo `/admin/pages`
- Cole o HTML no campo "Conteúdo"
- Clique em "Salvar Página"

❌ **EVITE**:
- Editar arquivos `.tsx` diretamente
- Modificar código manualmente

**Por quê?**
- Alterações no CMS são persistentes
- Não precisam de deploy
- Fácil para não-programadores

### 2. O HTML Deve Ser Completo

O HTML que você colar deve incluir:
- ✅ Todas as `<section>` da página
- ✅ Todo o conteúdo dentro das seções
- ✅ Todos os estilos (className)
- ✅ Todos os links e botões

### 3. Classes CSS Usadas

O projeto usa Tailwind CSS. As classes comuns são:
- `py-20` - Padding vertical
- `max-w-7xl` - Largura máxima
- `px-4 sm:px-6 lg:px-8` - Padding responsivo
- `grid md:grid-cols-2 lg:grid-cols-3` - Grid responsivo
- `rounded-xl` - Borda arredondada
- `border border-border` - Borda com cor do tema
- `bg-card/50` - Fundo com transparência
- `hover:border-primary/50` - Hover com cor primária
- `text-muted-foreground` - Texto secundário
- `font-bold` - Texto em negrito

### 4. Botões

Para criar botões, use este padrão:

```html
<!-- Botão Primário -->
<a href="https://wa.me/5592984607721" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
  Texto do Botão
</a>

<!-- Botão Secundário -->
<a href="#" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
  Texto do Botão
</a>
```

### 5. Como Adicionar Imagens

```html
<!-- Imagem local (public/) -->
<img src="/nome-da-imagem.jpg" alt="Descrição da imagem" className="w-full h-auto rounded-lg" />

<!-- Imagem externa -->
<img src="https://exemplo.com/imagem.jpg" alt="Descrição da imagem" className="w-full h-auto rounded-lg" />
```

---

## 🎨 Outras Páginas

O mesmo processo se aplica às outras páginas:

| Página | Slug | URL |
|---------|-------|------|
| Ipixuna | `ipixuna` | `/ipixuna` |
| Eirunepe | `eirunepe` | `/eirunepe` |
| Itamarati | `itamarati` | `/itamarati` |
| Carauari | `carauari` | `/carauari` |
| Cobertura | `coverage` | `/coverage` |
| Indicar | `indicar` | `/indicar` |

Você pode copiar o HTML de cada uma dessas páginas e colar no CMS da mesma forma!

---

## 🔧 Troubleshooting

### Problema: Página aparece como "Página não encontrada"

**Causa**: O banco de dados não está configurado

**Solução**: Execute o SQL do arquivo `CMS_PAGES_SETUP_GUIDE.md`

### Problema: O HTML não é renderizado corretamente

**Causa**: HTML mal formado ou tags não fechadas

**Solução**: Verifique se todas as tags estão fechadas corretamente

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

### Problema: Alterações não aparecem

**Causas possíveis**:
1. Cache do navegador
2. A página não foi salva

**Soluções**:
- Limpe o cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R)
- Verifique se a página foi salva no CMS
- Aguarde alguns segundos (o cache se atualiza automaticamente)

---

## 📚 Documentação Completa

- **`CMS_PAGES_DOCUMENTATION.md`** - Documentação técnica completa do CMS
- **`CMS_PAGES_SETUP_GUIDE.md`** - Guia de configuração do banco de dados
- **Este arquivo** - Guia prático de uso do CMS

---

## ✅ Resumo Rápido

1. ✅ Execute o SQL do `CMS_PAGES_SETUP_GUIDE.md`
2. ✅ Acesse `/admin/pages`
3. ✅ Edite a página "Soluções para Empresas"
4. ✅ Copie o HTML da página `/empresas`
5. ✅ Cole no campo "Conteúdo (HTML/Markdown)"
6. ✅ Clique em "Salvar Página"
7. ✅ Acesse `/empresas` para ver as mudanças!

---

**Data**: 15/02/2025  
**Status**: ✅ CMS pronto para uso  
**Única pendência**: Executar SQL do banco de dados