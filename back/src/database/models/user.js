const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Name: DataTypes.STRING,
    Password: DataTypes.STRING,
    ProtGoal: DataTypes.INTEGER,
    CarbGoal: DataTypes.INTEGER,
    FatGoal: DataTypes.INTEGER,
    CalGoal: DataTypes.INTEGER,
    Weight: DataTypes.FLOAT,
    Height: DataTypes.FLOAT,
    Age: DataTypes.INTEGER,
    FitnessLvl: DataTypes.INTEGER
});

module.exports = User;