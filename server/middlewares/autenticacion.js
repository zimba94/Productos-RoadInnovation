//================
//Verificar token
//================
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {
    let token = req.get('token'); //authorization


    if (token !== '123') {
        return res.status(401).json({
            ok: false,
            err: {
                message: "Token inválido"
            }
        });
    }

    next();
};



module.exports = {
    verificaToken,

}