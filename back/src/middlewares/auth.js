const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user');

dotenv.config();

exports.authToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const decodedUser = jwt.verify(token, process.env.JWT_SECRET);  // Verifica Token
            console.log('Token decodificado:', decodedUser);

            const verifyUser = await User.findByPk(decodedUser.id);  // Busca o usuário

            if (verifyUser) {
                req.user = verifyUser.dataValues; // Adiciona o usuário à requisição
                next();
            } else {
                return res.status(402).json({ sucesso: 0, msg: "Usuário não encontrado" });
            }
        } catch (error) {
            return res.status(401).json({ sucesso: 0, msg: "Token inválido" });
        }
    } else {
        return res.status(400).json({ sucesso: 0, msg: "Token não fornecido" });
    }
};
