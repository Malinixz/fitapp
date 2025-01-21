const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Connections = sequelize.define('Connections', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  User1_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  User2_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Connections;
