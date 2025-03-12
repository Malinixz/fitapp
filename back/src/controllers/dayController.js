const Day = require('../database/models/day');
const Meal = require('../database/models/meal');
const MealFood = require('../database/models/meal_food');

exports.createDay = async (req, res) => {
    const { Date, ProtTotal, ProtGoal, CarbTotal, CarbGoal, FatTotal, FatGoal, CaloriesTotal, CaloriesGoal } = req.body;
    const ID_User = req.user.ID;
    
    try {
        const existingDay = await Day.findOne({ where: { Date, ID_User } });
        
        if (existingDay) {
            return res.status(409).send({ sucesso: 0, msg: "Dia já iniciado" });
        }

        const newDay = await Day.create({
            Date,
            ID_User,
            ProtTotal,
            ProtGoal,
            CarbTotal,
            CarbGoal,
            FatTotal,
            FatGoal,
            CaloriesTotal,
            CaloriesGoal
        });

        // Cria as refeições padrão para o novo dia
        const mealNames = ['Café da Manhã', 'Almoço', 'Janta', 'Lanches'];
        for (const mealName of mealNames) {
          await Meal.create({
            ID_Day: newDay.ID, // Use o ID do dia recém-criado
            Name: mealName,
          });
        }

        res.status(201).json({ sucesso: 1, msg: "Dia criado com sucesso!", data: newDay });
    } catch (err) {
        res.status(500).json({ sucesso: 0, msg: "Erro ao criar dia: " + err.message });
    }
};

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

exports.getOneDay = async (req, res) => {
    const { Date } = req.params;
    const ID_User = req.user.ID;

    try {
        const day = await Day.findOne({ where: { ID_User, Date } });

        if (!day) {
            return res.status(404).json({ sucesso: 0, msg: "Nenhum dia encontrado para este usuário." });
        }

        res.status(200).json({ sucesso: 1, data: day });
    } catch (err) {
        res.status(500).json({ sucesso: 0, msg: "Erro ao buscar dia: " + err.message });
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

exports.getDayDetails = async (req, res) => {
    const { ID } = req.params;
  
    try {
      const day = await Day.findByPk(ID, {
        include: [
          {
            model: Meal,
            include: [MealFood], // Inclui os alimentos de cada refeição
          },
        ],
      });
  
      if (!day) {
        return res.status(404).json({ sucesso: 0, msg: "Dia não encontrado." });
      }
  
      res.status(200).json({ sucesso: 1, data: day });
    } catch (err) {
      res.status(500).json({ sucesso: 0, msg: "Erro ao buscar detalhes do dia: " + err.message });
    }
  };