const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MealFood = sequelize.define('Meal_Food', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ID_Meal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ID_Food_API: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Serving: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Serving_Quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Serving_Total: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = MealFood;
