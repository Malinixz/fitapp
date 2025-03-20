const User = require('../user');
const Day = require('../day');
const Meal = require('../meal');
const MealFood = require('../meal_food');
const WeightUpdates = require('../weight_updates');
const Connections = require('../connections');
// const Messages = require('./messages');  //???

// Relacionamentos

// 1. User - Day (1:N)
User.hasMany(Day, {
  foreignKey: 'ID_User',
  onDelete: 'CASCADE',
});
Day.belongsTo(User, {
  foreignKey: 'ID_User',
});

// 2. Day - Meal (1:N)
Day.hasMany(Meal, {
  foreignKey: 'ID_Day',
  onDelete: 'CASCADE',
});
Meal.belongsTo(Day, {
  foreignKey: 'ID_Day',
});

// 3. Meal - MealFood (1:N)
Meal.hasMany(MealFood, {
  foreignKey: 'ID_Meal',
  onDelete: 'CASCADE',
});
MealFood.belongsTo(Meal, {
  foreignKey: 'ID_Meal',
});

// 4. User - WeightUpdates (1:N)
User.hasMany(WeightUpdates, {
  foreignKey: 'User_ID',
  onDelete: 'CASCADE',
});
WeightUpdates.belongsTo(User, {
  foreignKey: 'User_ID',
});

// // 5. User - Connections (N:N via Connections)
// User.belongsToMany(User, {
//   through: Connections,
//   as: 'Connections',
//   foreignKey: 'User1_ID',
//   otherKey: 'User2_ID',
// });
// Connections.belongsTo(User, { foreignKey: 'User1_ID' });
// Connections.belongsTo(User, { foreignKey: 'User2_ID' });

// // 8. Connections - Messages (1:N)   //???
// Connections.hasMany(Messages, {
//   foreignKey: 'Connection_ID',
//   onDelete: 'CASCADE',
// });
// Messages.belongsTo(Connections, {
//   foreignKey: 'Connection_ID',
// });

// // 9. Messages - User (N:1 para remetente e destinatário)    //???
// User.hasMany(Messages, {
//   foreignKey: 'Sender_ID',
//   as: 'SentMessages',
// });
// Messages.belongsTo(User, {
//   foreignKey: 'Sender_ID',
//   as: 'Sender',
// });

// User.hasMany(Messages, {
//   foreignKey: 'Receiver_ID',
//   as: 'ReceivedMessages',
// });
// Messages.belongsTo(User, {
//   foreignKey: 'Receiver_ID',
//   as: 'Receiver',
// });

module.exports = {
  User,
  Day,
  Meal,
  MealFood,
  WeightUpdates,
  // Connections,   //???
//   Messages,  //???
};
