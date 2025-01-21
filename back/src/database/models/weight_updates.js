const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const WeightUpdates = sequelize.define('Weight_Updates', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  User_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Date: DataTypes.DATE,
  Weight: DataTypes.FLOAT,
  Notes: DataTypes.STRING
});

module.exports = WeightUpdates;
