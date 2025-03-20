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
  Calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  Prot: {
    type: DataTypes.FLOAT(4,1),
    allowNull: false,
    defaultValue: 0
  },
  Carb: {
    type: DataTypes.FLOAT(4,1),
    allowNull: false,
    defaultValue: 0
  },
  Fat: {
    type: DataTypes.FLOAT(4,1),
    allowNull: false,
    defaultValue: 0
  },
});

module.exports = Meal;
