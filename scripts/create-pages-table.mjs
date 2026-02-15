import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://ondeline:ondeline_password@localhost:5432/ondeline_telecom'
});

async function createPagesTable() {
  try {
    console.log('🚀 Criando tabela pages...');

    // Criar tabela
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pages (
        id VARCHAR(255) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        description TEXT,
        meta_title VARCHAR(255),
        meta_description TEXT,
        keywords TEXT[],
        hero_title VARCHAR(255),
        hero_subtitle TEXT,
        hero_image VARCHAR(500),
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela pages criada');

    // Criar índices
    await pool.query('CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_pages_active ON pages(active)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_pages_updated_at ON pages(updated_at)');
    console.log('✅ Índices criados');

    // Inserir páginas padrão
    const pages = [
      {
        id: 'page-ipixuna',
        slug: 'ipixuna',
        title: 'Internet em Ipixuna',
        content: 'Conteúdo da página de Ipixuna',
        hero_title: 'Internet de Alta Velocidade em Ipixuna',
        hero_subtitle: 'Conecte sua casa ou empresa com a melhor internet da região',
        active: true
      },
      {
        id: 'page-eirunepe',
        slug: 'eirunepe',
        title: 'Internet em Eirunepe',
        content: 'Conteúdo da página de Eirunepe',
        hero_title: 'Internet de Alta Velocidade em Eirunepe',
        hero_subtitle: 'Conecte sua casa ou empresa com a melhor internet da região',
        active: true
      },
      {
        id: 'page-itamarati',
        slug: 'itamarati',
        title: 'Internet em Itamarati',
        content: 'Conteúdo da página de Itamarati',
        hero_title: 'Internet de Alta Velocidade em Itamarati',
        hero_subtitle: 'Conecte sua casa ou empresa com a melhor internet da região',
        active: true
      },
      {
        id: 'page-carauari',
        slug: 'carauari',
        title: 'Internet em Carauari',
        content: 'Conteúdo da página de Carauari',
        hero_title: 'Internet de Alta Velocidade em Carauari',
        hero_subtitle: 'Conecte sua casa ou empresa com a melhor internet da região',
        active: true
      },
      {
        id: 'page-empresas',
        slug: 'empresas',
        title: 'Soluções para Empresas',
        content: 'Conteúdo da página de Empresas',
        hero_title: 'Servidores e Cloud Computing para Empresas',
        hero_subtitle: 'Infraestrutura robusta, segura e escalável para impulsionar seu negócio',
        active: true
      },
      {
        id: 'page-coverage',
        slug: 'coverage',
        title: 'Mapa de Cobertura',
        content: 'Conteúdo da página de Cobertura',
        hero_title: 'Mapa de Cobertura Ondeline',
        hero_subtitle: 'Verifique se sua região está coberta pela nossa rede',
        active: true
      },
      {
        id: 'page-indicar',
        slug: 'indicar',
        title: 'Indique um Amigo',
        content: 'Conteúdo da página de Indicação',
        hero_title: 'Indique a Ondeline e Ganhe',
        hero_subtitle: 'Ganhe benefícios ao indicar nossos serviços para amigos e familiares',
        active: true
      }
    ];

    for (const page of pages) {
      await pool.query(`
        INSERT INTO pages (id, slug, title, content, hero_title, hero_subtitle, active)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (slug) DO NOTHING
      `, [page.id, page.slug, page.title, page.content, page.hero_title, page.hero_subtitle, page.active]);
    }
    console.log('✅ Páginas padrão inseridas');

    console.log('\n🎉 CMS de páginas configurado com sucesso!');
    console.log('📝 Páginas disponíveis:');
    console.log('   - /ipixuna');
    console.log('   - /eirunepe');
    console.log('   - /itamarati');
    console.log('   - /carauari');
    console.log('   - /empresas');
    console.log('   - /coverage');
    console.log('   - /indicar');
    console.log('\n🎯 Acesse: /admin/pages para gerenciar as páginas');

  } catch (error) {
    console.error('❌ Erro ao criar tabela pages:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

createPagesTable();