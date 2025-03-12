// mealController.js
const MealFood = require('../database/models/meal_food');
const Meal = require('../database/models/meal');
const Day = require('../database/models/day');
const sequelize = require('../database/config/db');

exports.addFood = async (req, res) => {
    const { Name, ID_Food_API, Serving, Serving_Quantity, Serving_Total, Calories, Prot, Carb, Fat } = req.body;
    const ID_Meal = req.params.ID_Meal;
    const t = await sequelize.transaction(); // Inicia a transação
    
    try {
      const meal = await Meal.findByPk(ID_Meal, { transaction: t });
      if (!meal) {
        await t.rollback(); // RollBack da transação em caso de erro
        return res.status(404).json({ sucesso: 0, msg: "Refeição não encontrada." });
      }

      const day = await Day.findByPk(meal.ID_Day, { transaction: t });
      if (!day) {
        await t.rollback();
        return res.status(404).json({ sucesso: 0, msg: "Dia não encontrado." });
      }
  
      const newFood = await MealFood.create({
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
  
      await meal.update({
        Calories: meal.Calories + Calories,
        Prot: meal.Prot + Prot,
        Carb: meal.Carb + Carb,
        Fat: meal.Fat + Fat,
      }, { transaction: t });

      await day.update({
        CaloriesTotal: day.CaloriesTotal + Calories,
        ProtTotal: day.ProtTotal + Prot,
        CarbTotal: day.CarbTotal + Carb,
        FatTotal: day.FatTotal + Fat,
      }, { transaction: t });  
  
      await t.commit();
      res.status(201).json({ sucesso: 1, msg: "Alimento adicionado com sucesso!", data: newFood });
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

      const day = await Day.findByPk(meal.ID_Day, { transaction: t });
      if (!day) {
        await t.rollback();
        return res.status(404).json({ sucesso: 0, msg: "Dia não encontrado." });
      }
  
      await food.destroy({ transaction: t });
  
      await meal.update({
        Calories: meal.Calories - food.Calories,
        Prot: meal.Prot - food.Prot,
        Carb: meal.Carb - food.Carb,
        Fat: meal.Fat - food.Fat,
      }, { transaction: t });

      await day.update({
        CaloriesTotal: day.CaloriesTotal - food.Calories,
        ProtTotal: day.ProtTotal - food.Prot,
        CarbTotal: day.CarbTotal - food.Carb,
        FatTotal: day.FatTotal - food.Fat,
      }, { transaction: t });  
  
      await t.commit();
      res.status(200).json({ sucesso: 1, msg: "Alimento removido com sucesso!" });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ sucesso: 0, msg: "Erro ao remover alimento: " + err.message });
    }
  };

exports.editFood = async (req, res) => {    //???
  const { ID, Serving, Serving_Quantity, Calories, Prot, Carb, Fat } = req.body;

  try {
    const food = await MealFood.findByPk(ID);
    if (!food) {
      return res.status(404).json({ sucesso: 0, msg: "Alimento não encontrado na refeição." });
    }

    await food.update({
      Serving,
      Serving_Quantity,
      Calories,
      Prot,
      Carb,
      Fat,
    });

    res.status(200).json({ sucesso: 1, msg: "Alimento atualizado com sucesso!", data: food });
  } catch (err) {
    res.status(500).json({ sucesso: 0, msg: "Erro ao atualizar alimento: " + err.message });
  }
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