const mongoose = require('mongoose');
const UsuarioModel = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const CitaModel = require('../models/Cita');
const { ObjectID, ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs');
const { validame } = require("validame");


const registro = async (req, res) => {

    try {
        let { nombre, apellidos, telefono, email, password } = req.body;

        //valido campos
        let error = validame(nombre, {
            allow: "aA ñÑ _",
        });

        if (error) {
            return res.status(400).send({ nombre: error });
        };

        error = validame(apellidos, {
            allow: "aA ñÑ _",
        });

        if (error) {
            return res.status(400).send({ apellidos: error });
        };

        error = validame(telefono, {
            allow: "phoneEs",
        });

        if (error) {
            return res.status(400).send({ telefono: error });
        };

        error = validame(email, {
            allow: "email",
        });

        if (error) {
            return res.status(400).send({ email: error });
        };

        error = validame(password, {
            min: 4,
        });

        if (error) {
            return res.status(400).send({ password: error });
        };

        //encripto contraseña
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        await UsuarioModel.create({
            nombre: nombre,
            apellidos: apellidos,
            telefono: telefono,
            email: email,
            password: hash
        });
        res.send({ message: 'Te has registrado correctamente.' })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'No has podido registrarte.' });
    }
}


const login = async (req, res) => {

    try {
        let { email, password } = req.body;

        let encontrado = await UsuarioModel.findOne({ email: email });

        if (!encontrado) {
            return res.status(401).send('Credenciales inválidas.')
        }

        let correcta = bcrypt.compareSync(password, encontrado.password);

        if (!correcta) {
            return res.status(401).send('Credenciales inválidas')
        }


        const token = jwt.sign({

            id: encontrado._id,
            rol: encontrado.rol

        }, 'VI2GLSb6YNOiL3lyCr0VWlPC3HrVKX4JUcf7zF6IOFdVZYXt4HCUYGKmA7yqqms', { expiresIn: '1d' });


        encontrado.token = token;

        encontrado.save();

        res.send({
            nombre: encontrado.nombre,
            apellidos: encontrado.apellidos,
            telefono: encontrado.telefono,
            email: encontrado.email,
            token: encontrado.token
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'No se ha podido iniciar sesión.' });
    }
};


const logout = async (req, res) => {

    try {
        const token = req.headers.authorization;

        await UsuarioModel.findOneAndUpdate({ token: token }, { token: null });

        res.send('Has cerrado sesión.')

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'No se ha podido cerrar sesión.' });
    }

};


const mostrarUsuarios = (req, res) => {

    UsuarioModel.find()
        .then(usuarios => {
            res.send(usuarios)
        })
        .catch(error => console.log(error))
};


const buscarUsuariosId = async (req, res) => {

    try {
        let usuarios = await UsuarioModel.findById(req.params.id);
        res.send(usuarios);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'No se ha podido encontrar usuarios.' });
    }
};

const baja = async (req, res) => {

    let token = req.headers.authorization;

    try {
        let usuario = await UsuarioModel.findOneAndDelete({
            token: token
        });

        // si se da de baja se borran todas sus citas
        if (usuario) {
            await CitaModel.deleteMany({ usuarioId: ObjectID(usuario._id) });
        }

        res.send({ message: 'Se ha eliminado la cuenta correctamente.' })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'No se ha podido eliminar el usuario.' });
    }
};


module.exports = { mostrarUsuarios, buscarUsuariosId, registro, login, logout, baja };