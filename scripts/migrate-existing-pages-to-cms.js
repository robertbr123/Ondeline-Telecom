/**
 * Script para migrar páginas existentes para o CMS
 * 
 * Este script lê os arquivos de páginas existentes (ipixuna, eirunepe, etc.)
 * extrai o conteúdo HTML e salva no banco de dados do CMS.
 * 
 * Uso:
 *   node scripts/migrate-existing-pages-to-cms.js
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// Configuração do banco de dados
// Atualize com suas credenciais
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'ondeline',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
};

// Mapeamento de páginas existentes
const pagesToMigrate = [
  {
    slug: 'ipixuna',
    title: 'Internet em Ipixuna',
    description: 'Internet de alta velocidade em Ipixuna, Amazonas',
    hero_title: 'Internet de Alta Velocidade em Ipixuna',
    hero_subtitle: 'Conexão estável e rápida para sua casa ou empresa',
    filePath: 'app/ipixuna/page.tsx',
  },
  {
    slug: 'eirunepe',
    title: 'Internet em Eirunepé',
    description: 'Internet de alta velocidade em Eirunepé, Amazonas',
    hero_title: 'Internet de Alta Velocidade em Eirunepé',
    hero_subtitle: 'Conexão estável e rápida para sua casa ou empresa',
    filePath: 'app/eirunepe/page.tsx',
  },
  {
    slug: 'itamarati',
    title: 'Internet em Itamarati',
    description: 'Internet de alta velocidade em Itamarati, Amazonas',
    hero_title: 'Internet de Alta Velocidade em Itamarati',
    hero_subtitle: 'Conexão estável e rápida para sua casa ou empresa',
    filePath: 'app/itamarati/page.tsx',
  },
  {
    slug: 'carauari',
    title: 'Internet em Carauari',
    description: 'Internet de alta velocidade em Carauari, Amazonas',
    hero_title: 'Internet de Alta Velocidade em Carauari',
    hero_subtitle: 'Conexão estável e rápida para sua casa ou empresa',
    filePath: 'app/carauari/page.tsx',
  },
  {
    slug: 'coverage',
    title: 'Áreas de Cobertura',
    description: 'Confira as áreas de cobertura da Ondeline Telecom',
    hero_title: 'Áreas de Cobertura',
    hero_subtitle: 'Onde oferecemos internet de alta velocidade',
    filePath: 'app/coverage/page.tsx',
  },
  {
    slug: 'indicar',
    title: 'Indique e Ganhe',
    description: 'Indique a Ondeline e ganhe descontos no seu plano',
    hero_title: 'Indique e Ganhe',
    hero_subtitle: 'Amigos ganham desconto, você ganha benefícios',
    filePath: 'app/indicar/page.tsx',
  },
  {
    slug: 'empresas',
    title: 'Soluções para Empresas',
    description: 'Servidores, cloud computing e internet corporativa',
    hero_title: 'Servidores e Cloud Computing',
    hero_subtitle: 'Infraestrutura robusta para seu negócio',
    filePath: 'app/empresas/page.tsx',
  },
];

/**
 * Extrai o HTML de um arquivo de página React
 * @param {string} filePath - Caminho do arquivo
 * @returns {string} - HTML extraído
 */
function extractHtmlFromPage(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = fs.readFileSync(fullPath, 'utf8');

    // Padrões comuns para encontrar o JSX retornado
    const patterns = [
      // Pattern 1: Return direto com HTML
      /return\s*\(\s*<div[^>]*>([\s\S]*?)<\/div>\s*\)/,
      // Pattern 2: Return com múltiplos elementos
      /return\s*\(([\s\S]*?)\)/,
      // Pattern 3: Fragmento
      /return\s*<\>\s*([\s\S]*?)\s*<\/>/,
    ];

    let html = '';
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        html = match[1];
        break;
      }
    }

    // Se não encontrou, retorna todo o conteúdo após o return
    if (!html) {
      const returnMatch = content.match(/return\s*\(([\s\S]*)/);
      if (returnMatch) {
        html = returnMatch[1];
      }
    }

    // Limpar HTML removendo {expressões JavaScript}
    html = html.replace(/\{[^}]*\}/g, '');
    
    // Remover comentários
    html = html.replace(/\/\*[\s\S]*?\*\//g, '');
    html = html.replace(/\/\/.*/g, '');

    return html.trim();
  } catch (error) {
    console.error(`Erro ao ler arquivo ${filePath}:`, error.message);
    return '';
  }
}

/**
 * Cria uma página HTML completa a partir do conteúdo extraído
 * @param {object} pageData - Dados da página
 * @param {string} rawHtml - HTML extraído
 * @returns {string} - HTML completo
 */
function createCompleteHtml(pageData, rawHtml) {
  return `
<!-- Hero Section -->
<section className="relative py-24 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        ${pageData.hero_title}
      </h1>
      <p class="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
        ${pageData.hero_subtitle}
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://wa.me/5592984607721" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Falar com Especialista
        </a>
        <a href="https://wa.me/5592984607721" class="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
          Saiba Mais
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Conteúdo da Página -->
<section className="py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    ${rawHtml}
  </div>
</section>

<!-- CTA Section -->
<section className="py-20 bg-muted/30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-4xl font-bold mb-4">Pronto para começar?</h2>
    <p class="text-xl text-muted-foreground mb-8">
      Entre em contato conosco e conheça nossos planos
    </p>
    <a href="https://wa.me/5592984607721" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
      Fale Conosco Agora
    </a>
  </div>
</section>
  `.trim();
}

/**
 * Salva uma página no banco de dados
 * @param {object} client - Cliente PostgreSQL
 * @param {object} pageData - Dados da página
 */
async function savePageToDatabase(client, pageData) {
  try {
    // Verificar se a página já existe
    const checkQuery = `
      SELECT id FROM pages WHERE slug = $1
    `;
    const checkResult = await client.query(checkQuery, [pageData.slug]);

    if (checkResult.rows.length > 0) {
      console.log(`✓ Página "${pageData.slug}" já existe no banco de dados. Pulando...`);
      return;
    }

    // Extrair HTML do arquivo
    const rawHtml = extractHtmlFromPage(pageData.filePath);
    const completeHtml = createCompleteHtml(pageData, rawHtml);

    // Inserir no banco
    const insertQuery = `
      INSERT INTO pages (
        slug, title, content, description, 
        meta_title, meta_description, keywords,
        hero_title, hero_subtitle, hero_image,
        active, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4,
        $5, $6, $7,
        $8, $9, $10,
        $11, NOW(), NOW()
      )
    `;

    const values = [
      pageData.slug,
      pageData.title,
      completeHtml,
      pageData.description,
      pageData.title, // meta_title
      pageData.description, // meta_description
      [], // keywords (array vazio inicialmente)
      pageData.hero_title,
      pageData.hero_subtitle,
      '', // hero_image (vazio inicialmente)
      true, // active
    ];

    await client.query(insertQuery, values);
    console.log(`✓ Página "${pageData.slug}" migrada com sucesso!`);
  } catch (error) {
    console.error(`✗ Erro ao migrar página "${pageData.slug}":`, error.message);
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('🚀 Iniciando migração de páginas para o CMS...\n');

  const client = new Client(dbConfig);

  try {
    // Conectar ao banco
    console.log('📡 Conectando ao banco de dados...');
    await client.connect();
    console.log('✓ Conectado ao banco de dados\n');

    // Migrar cada página
    for (const pageData of pagesToMigrate) {
      console.log(`\n📄 Migrando: ${pageData.slug}`);
      await savePageToDatabase(client, pageData);
    }

    console.log('\n✅ Migração concluída com sucesso!');
    console.log('\n📊 Resumo:');
    console.log(`  - Páginas processadas: ${pagesToMigrate.length}`);
    console.log('  - Acesse /admin/pages para ver as páginas');
    console.log('  - Editando no admin, as alterações são aplicadas imediatamente\n');
  } catch (error) {
    console.error('\n❌ Erro durante a migração:', error);
  } finally {
    await client.end();
    console.log('📡 Conexão com banco encerrada');
  }
}

// Executar
main();