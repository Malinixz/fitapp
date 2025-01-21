const app = require('./src/app');
const dotenv = require('dotenv');
const { initializeDatabase } = require('./src/database/db_start');

// Carregar variáveis de ambiente
dotenv.config();

const PORT = process.env.PORT || 3000;

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o banco de dados:', error);
  });
