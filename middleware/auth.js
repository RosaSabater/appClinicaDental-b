const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/Usuario');


const auth = async (req, res, next) => {

    const token = req.headers.authorization;

    try {
        let correcto = jwt.verify(token, 'VI2GLSb6YNOiL3lyCr0VWlPC3HrVKX4JUcf7zF6IOFdVZYXt4HCUYGKmA7yqqms');

        if (!correcto) {
            return res.status(401).send({ message: 'Token inválido.' });
        };

        let existeUsuario = await UsuarioModel.findOne({ token: token });
        
        if (!existeUsuario) {
            return res.status(401).send({ message: 'Token inválido.' });
        };

        next();

    } catch (error) {
        console.error(error);
        res.status(401).send(error);
    }

};


module.exports = auth;