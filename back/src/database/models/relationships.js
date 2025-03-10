const User = require('./user');
const Day = require('./day');
const DayMeal = require('./day_meal');
const Meal = require('./meal');
const MealFood = require('./meal_food');
const Food = require('./food');
const Serving = require('./serving');
const WeightUpdates = require('./weight_updates');
const Connections = require('./connections');
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

// 2. Day - DayMeal (1:N)
Day.hasMany(DayMeal, {
  foreignKey: 'ID_Day',
  onDelete: 'CASCADE',
});
DayMeal.belongsTo(Day, {
  foreignKey: 'ID_Day',
});

// 3. DayMeal - MealFood (1:N)
DayMeal.hasMany(MealFood, {
  foreignKey: 'ID_Day_Meal',
  onDelete: 'CASCADE',
});
MealFood.belongsTo(DayMeal, {
  foreignKey: 'ID_Day_Meal',
});

// 4. User - WeightUpdates (1:N)
User.hasMany(WeightUpdates, {
  foreignKey: 'User_ID',
  onDelete: 'CASCADE',
});
WeightUpdates.belongsTo(User, {
  foreignKey: 'User_ID',
});

// 5. User - Connections (N:N via Connections)
User.belongsToMany(User, {
  through: Connections,
  as: 'Connections',
  foreignKey: 'User1_ID',
  otherKey: 'User2_ID',
});
Connections.belongsTo(User, { foreignKey: 'User1_ID' });
Connections.belongsTo(User, { foreignKey: 'User2_ID' });

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
  DayMeal,
  Meal,
  MealFood,
  Food,
  Serving,
  WeightUpdates,
//   Connections,   //???
//   Messages,  //???
};
