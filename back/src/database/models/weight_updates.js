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
  Date: DataTypes.DATEONLY,
  Weight: DataTypes.FLOAT,
});

module.exports = WeightUpdates;
