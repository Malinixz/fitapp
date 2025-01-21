const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Messages = sequelize.define('Messages', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Sender_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Receiver_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Content: DataTypes.STRING,
  Connection_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Messages;
