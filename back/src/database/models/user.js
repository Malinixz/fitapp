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
    Goal: {
        type: DataTypes.ENUM(
            'Perda de Peso Agressiva',
            'Perda de Peso',
            'Manter o Peso',
            'Ganho de Peso',
            'Ganho de Peso Agressivo'
        )
    },
    ActvLevel: { 
        type: DataTypes.ENUM(
            'Sedentário',
            'Levenmente Ativo',
            'Moderadamente Ativo',
            'Muito Ativo',
            'Extremamente Ativo'
        )
    },
    Gender: { 
        type: DataTypes.ENUM(
            'M',
            'F',
        )
    },
    Name: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    CompleteProfile: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    Password: DataTypes.STRING,
    ProtGoal: DataTypes.INTEGER,
    CarbGoal: DataTypes.INTEGER,
    FatGoal: DataTypes.INTEGER,
    CalGoal: DataTypes.INTEGER,
    Weight: DataTypes.FLOAT,
    Height: DataTypes.FLOAT,
    BirthDate: DataTypes.DATE
});

module.exports = User;
