const verifyParams = (requiredParams) => {
    return (req, res, next) => {
        for (let param of requiredParams) {
            if (!req.body.hasOwnProperty(param) || req.body[param] === ''){
                return res.status(400).json({
                    sucesso: 0,
                    msg: `Faltam parametros: ${param}`
                });
            }
        }
        next();
    };
};

module.exports = verifyParams;