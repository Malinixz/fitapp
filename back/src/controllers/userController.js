const User = require('../database/models/user');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");

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
            msg: "Autenticação realizada com sucesso!",
            token: jwt_token,
            Name: user.Name,
            Email: user.Email,
            CompleteProfile: user.CompleteProfile // Indica se o perfil esta completo
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

        await User.create({
            Name,
            Password: hashedPassword,
            Email
        });

        res.status(200).send({ sucesso: 1, msg: "Cadastro realizado com sucesso!" });
    } catch (err) {
        res.status(500).send({ sucesso: 0, msg: "Erro BD: " + err.message });
    }
};

exports.completeUserProfile = async (req, res) => {
    const { Email, ProtGoal, CarbGoal, FatGoal, CalGoal, Weight, Height, BirthDate, ActvLevel, Gender, Goal } = req.body;
    // ALTERAR FITNESS LVL PARA ACTV LEVEL, INSERIR CAMPOS GENDER E GOAL
    try {
        const user = await User.findOne({ where: { Email } });

        if (!user) {
            return res.status(404).send({ sucesso: 0, msg: "Usuário não encontrado" });
        }

        // Atualiza os dados do perfil
        await user.update({
            ProtGoal,
            CarbGoal,
            FatGoal,
            CalGoal,
            Weight,
            Height,
            BirthDate,
            ActvLevel,
            Gender,
            Goal,
            CompleteProfile: true
        });

        res.status(200).send({ sucesso: 1, msg: "Perfil complementado com sucesso!" });
    } catch (err) {
        res.status(500).send({ sucesso: 0, msg: "Erro BD: " + err.message });
    }
};


exports.editName = async (req, res) => {
    const { Name } = req.body;

    try {
        await User.update({ Name }, { where: { ID: req.user.id } });

        res.status(200).send({ sucesso: 1 });
    } catch (err) {
        res.status(500).send({ sucesso: 0, erro: "Erro BD: " + err.message });
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
