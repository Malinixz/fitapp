const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

// module.exports = sequelize;

const sequelize = new Sequelize({
  host: 'localhost',     
  port: 5432,            
  database: 'fitapp_db', 
  username: 'fitapp_db', 
  password: 'fitapp_db', 
  dialect: 'postgres',
  dialectOptions: {
    ssl: false
  },
});

module.exports = sequelize;
