const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n=== Gerador de Hash para Admin - Ondeline Telecom ===\n');

rl.question('Digite o nome de usuário (ex: admin): ', (username) => {
  rl.question('Digite a senha: ', async (password) => {
    if (!password || password.length < 6) {
      console.log('\n❌ Erro: A senha deve ter pelo menos 6 caracteres\n');
      rl.close();
      return;
    }

    try {
      const hash = bcrypt.hashSync(password, 10);
      
      console.log('\n✅ Hash gerado com sucesso!\n');
      console.log('─────────────────────────────────────');
      console.log('Usuário:', username);
      console.log('Hash da senha:', hash);
      console.log('─────────────────────────────────────\n');
      
      console.log('Copie o hash acima e use no Dokploy como:');
      console.log(`ADMIN_USERNAME=${username}`);
      console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
      
      console.log('Ou adicione ao seu arquivo .env.local\n');
    } catch (error) {
      console.error('\n❌ Erro ao gerar hash:', error.message, '\n');
    }
    
    rl.close();
  });
});
