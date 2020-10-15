const mongoose = require('mongoose');
const CitaModel = require('../models/Cita');
const UsuarioModel = require('../models/Usuario');
const {ObjectID} = require('mongodb')

const nuevaCita = async (req,res) => {

    try {
        let {fecha, usuarioId, motivo} = req.body;

        let cita = await CitaModel.create({
            fecha: new Date(fecha), 
            usuarioId: ObjectID(usuarioId),
            motivo: motivo
        });

        res.send (cita);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'No se ha podido crear la cita.' });
    }
}; 



module.exports = { nuevaCita};