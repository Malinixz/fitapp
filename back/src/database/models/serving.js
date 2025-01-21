const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Serving = sequelize.define('Serving', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_Food: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Type: DataTypes.STRING,
  Protein: DataTypes.INTEGER,
  Carb: DataTypes.INTEGER,
  Fat: DataTypes.INTEGER,
});

module.exports = Serving;
