const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://ondeline:ondeline_password@localhost:5432/ondeline_telecom'
  });

  try {
    console.log('🚀 Iniciando migration da tabela pages...');

    const migrationPath = path.join(__dirname, '../prisma/migrations/create_pages_table.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    await pool.query(migrationSQL);

    console.log('✅ Migration concluída com sucesso!');
    console.log('📊 Tabela "pages" criada');
    console.log('📝 Páginas padrão inseridas:');
    console.log('   - /ipixuna');
    console.log('   - /eirunepe');
    console.log('   - /itamarati');
    console.log('   - /carauari');
    console.log('   - /empresas');
    console.log('   - /coverage');
    console.log('   - /indicar');
    console.log('\n🎉 Agora você pode gerenciar as páginas em /admin/pages');

  } catch (error) {
    console.error('❌ Erro ao executar migration:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();