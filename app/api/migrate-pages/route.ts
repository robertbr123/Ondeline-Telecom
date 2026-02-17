/**
 * API para migrar páginas existentes para o CMS
 * 
 * Acesse via navegador ou curl:
 * - Navegador: http://localhost:5008/api/migrate-pages
 * - curl: curl http://localhost:5008/api/migrate-pages
 * 
 * Nota: Esta API requer configuração do banco em lib/db.ts
 */

import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'

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
 * Cria uma página HTML completa
 */
function createCompleteHtml(pageData: any, rawHtml: string): string {
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
 */
async function savePageToDatabase(pool: Pool, pageData: any): Promise<{success: boolean, message: string, existed: boolean}> {
  try {
    // Verificar se a página já existe
    const checkQuery = `
      SELECT id FROM pages WHERE slug = $1
    `;
    const checkResult = await pool.query(checkQuery, [pageData.slug]);

    if (checkResult.rows.length > 0) {
      return {
        success: true,
        message: `Página "${pageData.slug}" já existe no banco de dados`,
        existed: true
      };
    }

    // Criar HTML completo
    const rawHtml = '<!-- Conteúdo será editado no admin -->';
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
      RETURNING id
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

    await pool.query(insertQuery, values);
    
    return {
      success: true,
      message: `Página "${pageData.slug}" migrada com sucesso!`,
      existed: false
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Erro ao migrar página "${pageData.slug}": ${error.message}`,
      existed: false
    };
  }
}

export async function GET(request: NextRequest) {
  const results: {
    slug: string
    title: string
    success: boolean
    message: string
    existed: boolean
  }[] = [];

  try {
    // Obter configuração do banco
    const pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'ondeline',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      max: 1,
    });

    // Migrar cada página
    for (const pageData of pagesToMigrate) {
      const result = await savePageToDatabase(pool, pageData);
      results.push({
        slug: pageData.slug,
        title: pageData.title,
        ...result
      });
    }

    await pool.end();

    // Contar resultados
    const success = results.filter(r => r.success && !r.existed).length;
    const skipped = results.filter(r => r.existed).length;
    const errors = results.filter(r => !r.success).length;

    return NextResponse.json({
      success: true,
      message: 'Migração concluída!',
      summary: {
        total: results.length,
        migrated: success,
        skipped,
        errors
      },
      results
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Erro durante a migração: ${error.message}`,
      error: error.toString()
    }, { status: 500 });
  }
}