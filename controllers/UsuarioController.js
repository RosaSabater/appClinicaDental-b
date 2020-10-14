const mongoose = require('mongoose');
const UsuarioModel = require('../models/Usuario');



const registro = () => {

    UsuarioModel.create(req.body)
        .then(usuario => res.status(200).send(usuario))
        .catch(console.error)
};


const mostrarUsuarios = () => {

    UsuarioModel.find({})
    .then (usuarios=>{
        res.send(usuarios)
    })
    .catch(error=>console.log(error))
};




module.exports = {mostrarUsuarios, registro};