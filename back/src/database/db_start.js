const sequelize = require('./config/db'); // Importa a configuração do Sequelize
const User = require('./models/user')
const Day = require('./models/day')
const Day_Meal = require('./models/day_meal')
const Connections = require('./models/connections')
const Food = require('./models/food')
const Meal_Food = require('./models/meal_food')
const Serving = require('./models/serving')
const Weight_Updates = require('./models/weight_updates')

// Função para inicializar o Sequelize e sincronizar os modelos
exports.initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão ao banco de dados bem-sucedida.');
        
        // Sincroniza todos os modelos
        // await sequelize.sync({ alter: true }); 
        // console.log('Banco de Dados sincronizado com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados ou sincronizar: ', error);
    }
};