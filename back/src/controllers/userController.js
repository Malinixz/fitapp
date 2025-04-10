const User = require('../database/models/user');
const WeightUpdates = require('../database/models/weight_updates');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const sequelize = require('../database/config/db');

dotenv.config(); // Carrega .env

exports.loginUser = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const user = await User.findOne({ where: { Email } });

        if (!user) {
            return res.status(400).json({ msg: "Credenciais inválidas" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Credenciais inválidas" });
        }

        const payload = { id: user.ID };
        const jwt_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        return res.status(200).json({
            sucesso: 1,
            msg: "Autenticação realizada com sucesso!",
            token: jwt_token,
            data: {
                Email: user.Email,
                Name: user.Name,
                Gender: user.Gender,
                BirthDate: user.BirthDate,
                Weight: user.Weight,
                Height: user.Height,
                ActvLevel: user.ActvLevel,
                Goal: user.Goal,
                ProtGoal: user.ProtGoal,
                CarbGoal: user.CarbGoal,
                FatGoal: user.FatGoal,
                CaloriesGoal: user.CaloriesGoal,
                StepsGoal: user.StepsGoal,
                CompleteProfile: user.CompleteProfile,
            }
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

exports.registerUser = async (req, res) => {
    const { Name, Password, Email } = req.body;
    
    try {
        const existingUser = await User.findOne({ where: { Email } });
        
        if (existingUser) {
            return res.status(409).send({ sucesso: 0, msg: "Usuário já existe" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = await User.create({
            Name,
            Password: hashedPassword,
            Email
        });

        // Gera o token JWT após o registro
        const payload = { id: newUser.ID };
        const jwt_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        res.status(200).send({ 
            sucesso: 1, 
            msg: "Cadastro realizado com sucesso!",
            token: jwt_token,
            data: {
                Name: newUser.Name,
                Email: newUser.Email,
            }
        });
    } catch (err) {
        res.status(500).send({ sucesso: 0, msg: "Erro BD: " + err.message });
    }
};

exports.completeUserProfile = async (req, res) => {
    const { Email, ProtGoal, CarbGoal, FatGoal, CaloriesGoal, Weight, Height, BirthDate, ActvLevel, Gender, Goal } = req.body;
    const User_ID = req.user.ID
    const today = new Date().toLocaleDateString('en-CA');
    const t = await sequelize.transaction();
    
    try {
        const user = await User.findOne({ where: { Email } }, {transaction : t});

        if (!user) {
            await t.rollback()
            return res.status(404).send({ sucesso: 0, msg: "Usuário não encontrado" });
        }

        await user.update({
            ProtGoal,
            CarbGoal,
            FatGoal,
            CaloriesGoal,
            Weight,
            Height,
            BirthDate,
            ActvLevel,
            Gender,
            Goal,
            CompleteProfile: true
        }, { transaction : t });

        await WeightUpdates.create({
            User_ID,
            Date: today,
            Weight
        }, { transaction : t });

        await t.commit()
        res.status(200).send({ sucesso: 1, msg: "Perfil complementado com sucesso!", CompleteProfile: true});
    } catch (err) {
        await t.rollback()
        res.status(500).send({ sucesso: 0, msg: "Erro BD: " + err.message });
    }
};

exports.editEmail = async (req, res) => {
    const { Email } = req.body;

    try {
        const existingEmail = await User.findOne({ where: { Email } });

        if (existingEmail) {
            return res.status(409).send({ sucesso: 0, msg: "Email já utilizado" });
        }

        await User.update({ Email }, { where: { ID: req.user.id } });

        res.status(200).send({ sucesso: 1 });
    } catch (err) {
        res.status(500).send({ sucesso: 0, erro: "Erro BD: " + err.message });
    }
};

exports.editPassword = async (req, res) => {
    const { CurrentPassword, NewPassword } = req.body;

    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).send({ sucesso: 0, erro: "Usuário não encontrado" });
        }

        const isMatch = await bcrypt.compare(CurrentPassword, user.Password);

        if (!isMatch) {
            return res.status(401).send({ sucesso: 0, erro: "Senha atual incorreta" });
        }

        const hashedNewPassword = await bcrypt.hash(NewPassword, 10);

        await User.update({ Password: hashedNewPassword }, { where: { ID: req.user.id } });

        res.status(200).send({ sucesso: 1, mensagem: "Senha alterada com sucesso" });
    } catch (err) {
        res.status(500).send({ sucesso: 0, erro: "Erro BD: " + err.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { Name, ProtGoal, CarbGoal, FatGoal, CaloriesGoal, Height, BirthDate, ActvLevel, Gender, Goal } = req.body;

    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).send({ sucesso: 0, msg: "Usuário não encontrado" });
        }

        await user.update({
            Name,
            ProtGoal,
            CarbGoal,
            FatGoal,
            CaloriesGoal,
            Height,
            BirthDate,
            ActvLevel,
            Gender,
            Goal
        });

        res.status(200).send({ sucesso: 1, msg: "Perfil atualizado com sucesso!" });
    } catch (err) {
        res.status(500).send({ sucesso: 0, msg: "Erro BD: " + err.message });
    }
};

exports.updateUserWeight = async (req, res) => {
    const { Weight } = req.body;
    const User_ID = req.user.ID;
    const today = new Date().toLocaleDateString('en-CA'); // Obtém a data atual no formato YYYY-MM-DD
    
    try {
        const user = await User.findByPk(User_ID);
        
        if (!user) {
            return res.status(404).send({ sucesso: 0, msg: "Usuário não encontrado" });
        }

        await user.update({ Weight });

        const existingWeight = await WeightUpdates.findOne({  // Verifica se já houve registro de peso no dia atual
            where: {
                User_ID,
                Date: today
            }
        });

        if (existingWeight) {
            if (existingWeight.Weight === Weight) {
                return res.status(200).send({ sucesso: 0, msg: "Nenhuma alteração no peso registrada." });
            } else {
                await existingWeight.update({ Weight });
                return res.status(200).send({ sucesso: 1, msg: "Peso atualizado com sucesso!" });
            }
        } else {
            await WeightUpdates.create({
                User_ID,
                Date: today,
                Weight
            });
            return res.status(200).send({ sucesso: 1, msg: "Peso registrado com sucesso!" });
        }

    } catch (err) {
        res.status(500).send({ sucesso: 0, msg: "Erro BD: " + err.message });
    }
};

exports.getAllWeightUpdates = async (req,res) => {
    const User_ID = req.user.ID
    
    try {
        const user = await User.findByPk(User_ID);

        if (!user) {
            return res.status(404).send({ sucesso: 0, msg: "Usuário não encontrado" });
        }

        const allWeightUpdates = await WeightUpdates.findAll({
            where: {User_ID},
            order: [['Date', 'DESC']]
        });

        if(allWeightUpdates.length === 0){
            return res.status(404).send({ sucesso: 0, msg: "Nenhuma atualização de peso encontrada"})
        }

        return res.status(200).send({sucesso: 1, data: allWeightUpdates})
    } catch(err) {
        res.status(500).send({ sucesso: 0, msg: "Erro BD: " + err.message });
    }
}