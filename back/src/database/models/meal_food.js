const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MealFood = sequelize.define('Meal_Food', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_Meal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ID_Serving: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Quantity: DataTypes.INTEGER
});

module.exports = MealFood;
