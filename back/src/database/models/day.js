const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Day = sequelize.define('Day', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Date: DataTypes.DATE,
  ID_User: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ProtTotal: DataTypes.INTEGER,
  CarbTotal: DataTypes.INTEGER,
  FatTotal: DataTypes.INTEGER,
  CaloriesTotal: DataTypes.INTEGER
});

module.exports = Day;
