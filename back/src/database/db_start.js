const sequelize = require('./config/db'); // Importa a configuração do Sequelize
const User = require('./models/user')
const Day = require('./models/day')
const Connections = require('./models/connections')
const MealFood = require('./models/meal_food')
const Meal = require('./models/meal')
const WeightUpdates = require('./models/weight_updates')
require('./models/relationships/relationships'); // Relações

// Função para inicializar o Sequelize e sincronizar os modelos
exports.initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão ao banco de dados bem-sucedida.');
        
        // Sincroniza todos os modelos
        await sequelize.sync({ alter: true }); 
        console.log('Banco de Dados sincronizado com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados ou sincronizar: ', error);
    }
};