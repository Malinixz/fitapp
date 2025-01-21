const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Meal = sequelize.define('Meal', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: DataTypes.STRING,
  ID_User: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Meal;
