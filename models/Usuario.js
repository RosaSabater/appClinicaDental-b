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
        required: [true, 'El teléfono es requerido.']
    },
    email: {
        type: String,
        required: [true, 'El email es requerido.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido.'],
        minlength: 8
    },
    token: {
        type: String
    },
    // rol: {
    //     type: String,
    //     default: 'user',
    //     enum: ['admin', 'cliente']
    // }
})

UsuarioSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete token;
    delete user.__v;
    return user;
};

const UsuarioModel = mongoose.model("usuario", UsuarioSchema);
module.exports = UsuarioModel;
