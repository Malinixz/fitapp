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
  ProtTotal: DataTypes.FLOAT,
  ProtGoal: DataTypes.FLOAT,
  CarbTotal: DataTypes.FLOAT,
  CarbGoal: DataTypes.FLOAT,
  FatTotal: DataTypes.FLOAT,
  FatGoal: DataTypes.FLOAT,
  CaloriesTotal: DataTypes.INTEGER,
  CaloriesGoal: DataTypes.INTEGER,
  Steps: {
    type : DataTypes.INTEGER,
    defaultValue : 0
  },
  StepsGoal: {
    type : DataTypes.INTEGER,
    defaultValue : 7000
  }
});

module.exports = Day;
