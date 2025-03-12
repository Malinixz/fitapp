const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Meal = sequelize.define('Meal', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_Day: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Name: {
    type: DataTypes.ENUM(
      'Café da Manhã',
      'Almoço',
      'Janta',
      'Lanches',
    )
  },
  Calories: DataTypes.INTEGER,
  Prot: DataTypes.INTEGER,
  Carb: DataTypes.INTEGER,
  Fat: DataTypes.INTEGER,
});

module.exports = Meal;
