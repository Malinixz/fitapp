// mealController.js
const MealFood = require('../database/models/meal_food');
const Meal = require('../database/models/meal');
const Day = require('../database/models/day');
const sequelize = require('../database/config/db');

exports.addFood = async (req, res) => {
    const { Name, ID_Food_API, Serving, Serving_Quantity, Serving_Total, Calories, Prot, Carb, Fat } = req.body;
    console.log(req.body)
    const ID_Meal = req.params.ID_Meal;
    const t = await sequelize.transaction(); // Inicia a transação
    
    try {
      const meal = await Meal.findByPk(ID_Meal, { transaction: t });
      if (!meal) {
        await t.rollback(); // RollBack da transação em caso de erro
        return res.status(404).json({ sucesso: 0, msg: "Refeição não encontrada." });
      }
  
      await MealFood.create({
        ID_Meal,
        Name,
        ID_Food_API,
        Serving,
        Serving_Quantity,
        Serving_Total,
        Calories,
        Prot,
        Carb,
        Fat,
      }, { transaction: t });
  
      const day = await recalculateMealAndDay(meal,t)
  
      await t.commit();
      res.status(200).json({ sucesso: 1, msg: "Alimento adicionado com sucesso!", data: day });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ sucesso: 0, msg: "Erro ao adicionar alimento: " + err.message });
    }
  };
  
  exports.removeFood = async (req, res) => {
    const ID = req.params.ID;
    const t = await sequelize.transaction(); // Inicia a transação
  
    try {
      const food = await MealFood.findByPk(ID, { transaction: t });
      if (!food) {
        await t.rollback();
        return res.status(404).json({ sucesso: 0, msg: "Alimento não encontrado na refeição." });
      }
  
      const meal = await Meal.findByPk(food.ID_Meal, { transaction: t });
      if (!meal) {
        await t.rollback();
        return res.status(404).json({ sucesso: 0, msg: "Refeição não encontrada." });
      }
  
      await food.destroy({ transaction: t });
  
      const day = await recalculateMealAndDay(meal,t)
  
      await t.commit();
      res.status(200).json({ sucesso: 1, msg: "Alimento removido com sucesso!", data : day});
    } catch (err) {
      await t.rollback();
      res.status(500).json({ sucesso: 0, msg: "Erro ao remover alimento: " + err.message });
    }
  };

exports.editFood = async (req, res) => {
  const new_Serving_Quantity = req.body.Serving_Quantity;
  const ID = req.params.ID
  const t = await sequelize.transaction();

  try {
    const food = await MealFood.findByPk(ID);
    if (!food) {
      await t.rollback()
      return res.status(404).json({ sucesso: 0, msg: "Alimento não encontrado na refeição." });
    }

    // Calculo dos novos valores nutricionais
    const newCalories = Math.round((new_Serving_Quantity * food.Calories) / food.Serving_Quantity)
    const newProt = Number(((new_Serving_Quantity * food.Prot) / food.Serving_Quantity).toFixed(1))
    const newCarb = Number(((new_Serving_Quantity * food.Carb) / food.Serving_Quantity).toFixed(1))
    const newFat = Number(((new_Serving_Quantity * food.Fat) / food.Serving_Quantity).toFixed(1))

    await food.update({
      Serving_Quantity : new_Serving_Quantity,
      Calories : newCalories,
      Prot : newProt,
      Carb : newCarb,
      Fat : newFat,
    }, { transaction : t });

    const meal = await Meal.findByPk(food.ID_Meal, { transaction : t })
    
    const day = await recalculateMealAndDay(meal,t)

    await t.commit()
    res.status(200).json({ sucesso: 1, msg: "Alimento atualizado com sucesso!", data: day });
  } catch (err) {
    res.status(500).json({ sucesso: 0, msg: "Erro ao atualizar alimento: " + err.message });
  }
};

// Recalcula os macros de meal e day
const recalculateMealAndDay = async (meal, t) => {
  const mealFoods = await MealFood.findAll({ where: { ID_Meal: meal.ID }, transaction: t });

  const totalCalories = mealFoods.reduce((sum, f) => sum + f.Calories, 0);
  const totalProt = mealFoods.reduce((sum, f) => sum + f.Prot, 0);
  const totalCarb = mealFoods.reduce((sum, f) => sum + f.Carb, 0);
  const totalFat = mealFoods.reduce((sum, f) => sum + f.Fat, 0);

  await meal.update({
    Calories: totalCalories,
    Prot: totalProt,
    Carb: totalCarb,
    Fat: totalFat
  }, { transaction: t });

  // const day = await Day.findByPk(meal.ID_Day, { transaction: t });
  const day = await Day.findByPk(meal.ID_Day, {
    include: [{
        model: Meal,
        include: [MealFood],
    }],
    order: [[Meal, 'ID', 'ASC']],
    transaction : t
  });

  if (day) {
    const dayMeals = await Meal.findAll({ where: { ID_Day: day.ID }, transaction: t });

    const dayCalories = dayMeals.reduce((sum, m) => sum + m.Calories, 0);
    const dayProt = dayMeals.reduce((sum, m) => sum + m.Prot, 0);
    const dayCarb = dayMeals.reduce((sum, m) => sum + m.Carb, 0);
    const dayFat = dayMeals.reduce((sum, m) => sum + m.Fat, 0);

    await day.update({
      CaloriesTotal: dayCalories,
      ProtTotal: dayProt,
      CarbTotal: dayCarb,
      FatTotal: dayFat
    }, { transaction: t });

    return day // Retorna o dia atualizado
  }
  return null
};

exports.getAllMeals = async (req, res) => {
    const ID_Day = req.params.ID_Day

    try{
        const meals = await Meal.findAll({ where: { ID_Day } })

        res.status(200).json({ sucesso: 1, data: meals });
    } catch(err){ 
        res.status(500).json({ sucesso: 0, msg: "Erro ao buscar refeições: " + err.message });
    }
};