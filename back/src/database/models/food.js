const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Food = sequelize.define('Food', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: DataTypes.STRING
});

module.exports = Food;
