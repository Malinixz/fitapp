const Day = require('../database/models/day');
const Meal = require('../database/models/meal');
const MealFood = require('../database/models/meal_food');
const User = require('../database/models/user');
const sequelize = require('../database/config/db');

async function createDefaultDay(Date, user) {
    const t = await sequelize.transaction(); // Inicia a transação
    
    try {
      const newDay = await Day.create({
        Date,
        ID_User: user.ID,
        ProtTotal: 0,
        ProtGoal: user.ProtGoal,
        CarbTotal: 0,
        CarbGoal: user.CarbGoal,
        FatTotal: 0,
        FatGoal: user.FatGoal,
        CaloriesTotal: 0,
        CaloriesGoal: user.CaloriesGoal,
      }, { transaction : t });

      // Cria as refeições default  
      const mealNames = ['Café da Manhã', 'Almoço', 'Janta', 'Lanches'];
      for (const mealName of mealNames) {
        await Meal.create({
          ID_Day: newDay.ID,
          Name: mealName,
        }, { transaction : t });
      }

      await t.commit(); // Confirma a transação se tudo ocorrer bem
      return newDay;
    } catch (err) {
      await t.rollback(); // Desfaz a transação em caso de erro
      throw err;
    }
}

exports.getAllDays = async (req, res) => {
    const ID_User = req.user.ID;

    try {
        const days = await Day.findAll({ where: { ID_User } });

        if (days.length === 0) {
            return res.status(404).json({ sucesso: 0, msg: "Nenhum dia encontrado para este usuário." });
        }

        res.status(200).json({ sucesso: 1, data: days });
    } catch (err) {
        res.status(500).json({ sucesso: 0, msg: "Erro ao buscar dias: " + err.message });
    }
};
  
exports.getDayDetails = async (req, res) => {
    const ID_User = req.user.ID;
    const { Date } = req.params;

    try {
      let day = await Day.findOne({
        where: { ID_User, Date },
        include: [
          { 
            model: Meal, // INCLUI AS REFEIÇÕES RELACIONADAS AO DIA
            include: [MealFood] }], // INCLUI OS ALIMENTOS DESSA REFEIÇÃO
      });

      if (!day) {
        const user = await User.findByPk(ID_User);

        if (!user) {
          return res.status(404).json({ sucesso: 0, msg: "Usuário não encontrado." });
        }

        day = await createDefaultDay(Date, user);
        
        day = await Day.findOne({
          where: { ID_User, Date },
          include: [{ model: Meal, include: [MealFood] }],
        });
      }

      res.status(200).json({ sucesso: 1, data: day });
    } catch (err) {
      res.status(500).json({ sucesso: 0, msg: "Erro ao buscar/criar detalhes do dia: " + err.message });
    }
};

exports.updateDayProgress = async (req, res) => {
    const { ID } = req.params;
    const { ProtTotal, CarbTotal, FatTotal, CaloriesTotal } = req.body;
    const ID_User = req.user.ID; // Obtém o ID do usuário autenticado

    try {
        const day = await Day.findOne({ where: { ID, ID_User } });

        if (!day) {
            return res.status(404).json({ sucesso: 0, msg: "Dia não encontrado." });
        }

        await day.update({
            ProtTotal,
            CarbTotal,
            FatTotal,
            CaloriesTotal,
        });

        res.status(200).json({ sucesso: 1, msg: "Dia atualizado com sucesso!", data: day });
    } catch (err) {
        res.status(500).json({ sucesso: 0, msg: "Erro ao atualizar dia: " + err.message });
    }
};

exports.updateDayGoals = async (req, res) => {
    const { ID } = req.params;
    const { ProtGoal, CarbGoal, FatGoal, CaloriesGoal } = req.body;
    const ID_User = req.user.ID;

    try {
        const day = await Day.findOne({ where: { ID, ID_User } });

        if (!day) {
            return res.status(404).json({ sucesso: 0, msg: "Dia não encontrado." });
        }

        await day.update({
            ProtGoal,
            CarbGoal,
            FatGoal,
            CaloriesGoal,
        });

        res.status(200).json({ sucesso: 1, msg: "Dia atualizado com sucesso!", data: day });
    } catch (err) {
        res.status(500).json({ sucesso: 0, msg: "Erro ao atualizar dia: " + err.message });
    }
};
