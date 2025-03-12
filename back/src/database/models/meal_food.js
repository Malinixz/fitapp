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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Serving: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Serving_Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Serving_Total: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Prot: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Carb: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Fat: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = MealFood;
