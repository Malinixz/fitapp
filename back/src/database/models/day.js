const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Day = sequelize.define('Day', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Date: DataTypes.DATEONLY,
  ID_User: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ProtTotal: DataTypes.INTEGER,
  ProtGoal: DataTypes.INTEGER,
  CarbTotal: DataTypes.INTEGER,
  CarbGoal: DataTypes.INTEGER,
  FatTotal: DataTypes.INTEGER,
  FatGoal: DataTypes.INTEGER,
  CaloriesTotal: DataTypes.INTEGER,
  CaloriesGoal: DataTypes.INTEGER
});

module.exports = Day;
