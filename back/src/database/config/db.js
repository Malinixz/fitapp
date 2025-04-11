const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,     
  port: process.env.DB_PORT,            
  database: process.env.DB_NAME, 
  username: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  dialect: 'postgres',
  dialectOptions: {
    ssl: false
  },
});

module.exports = sequelize;
