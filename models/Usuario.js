const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const UsuarioModel = mongoose.model("usuario", UsuarioSchema);
module.exports = UsuarioModel;
