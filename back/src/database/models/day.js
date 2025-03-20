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
  ProtTotal: DataTypes.FLOAT(4,1),
  ProtGoal: DataTypes.FLOAT(4,1),
  CarbTotal: DataTypes.FLOAT(4,1),
  CarbGoal: DataTypes.FLOAT(4,1),
  FatTotal: DataTypes.FLOAT(4,1),
  FatGoal: DataTypes.FLOAT(4,1),
  CaloriesTotal: DataTypes.INTEGER,
  CaloriesGoal: DataTypes.INTEGER
});

module.exports = Day;
