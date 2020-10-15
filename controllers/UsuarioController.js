const mongoose = require('mongoose');
const UsuarioModel = require('../models/Usuario');
const jwt = require('jsonwebtoken');



const registro = (req, res) => {

    UsuarioModel.create(req.body)
        .then(usuario => res.status(200).send(usuario))
        .catch(error => console.log(error))

};


const login = async (req, res) => {

    try {

        let body = req.body;
        let email = body.email;
        let password = body.password;

        let encontrado = await UsuarioModel.findOne({ email: email, password: password });

        if (!encontrado) {
            return res.status(401).send('Credenciales inválidas.');
        }

        if (password !== encontrado.password) {
            return res.status(401).send('Credenciales inválidas')
        }


        const token = jwt.sign({

            id: encontrado._id

        }, 'geekshubs', { expiresIn: '1d' });


        encontrado.token = token;
        encontrado.save();

        res.send({ email: encontrado.email })

    } catch (error) {

        console.log(error)
        res.status(500).send(error)

    }
};


const logout = async (req, res) => {

    try {

        const token = req.headers.authorization;

        let logoutUsuario = await UsuarioModel.findOne({ token: token });

        logoutUsuario.token = null;
        logoutUsuario.save();

        res.send('Has cerrado sesión')

    } catch (error) {

        console.log(error)
        res.status(500).send(error);

    }

};


const mostrarUsuarios = (req, res) => {

    UsuarioModel.find({})
        .then(usuarios => {
            res.send(usuarios)
        })
        .catch(error => console.log(error))
};




module.exports = { mostrarUsuarios, registro, login, logout };