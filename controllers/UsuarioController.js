const mongoose = require('mongoose');
const UsuarioModel = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const CitaModel = require('../models/Cita');
const { ObjectID, ObjectId } = require('mongodb')



const registro = (req, res) => {

    UsuarioModel.create(req.body)
        .then(usuario => res.status(200).send(usuario))
        .catch(error => console.log(error))

};


const login = async (req, res) => {

    try {
        let { email, password } = req.body;

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
        
        // if (token === encontrado.token) {
        //     return res.status(401).send('Ya has iniciado sesión anteriormente.')
        // }

        res.send(encontrado);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'No se ha podido iniciar sesión.' });
    }
};


const logout = async (req, res) => {

    try {
        const token = req.headers.authorization;

        let logoutUsuario = await UsuarioModel.findOne({ token: token });

        logoutUsuario.token = null;
        logoutUsuario.save();

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

        if (usuario) {
            let borrarCitas = await CitaModel.deleteMany({ usuarioId: ObjectID(usuario._id) });
        }

        res.send({ message: 'Se ha eliminado la cuenta correctamente.' })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'No se ha podido eliminar el usuario.' });
    }
};


module.exports = { mostrarUsuarios, buscarUsuariosId, registro, login, logout, baja };