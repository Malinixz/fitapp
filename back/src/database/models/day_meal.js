const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DayMeal = sequelize.define('Day_Meal', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_Day: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ID_Meal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = DayMeal;
