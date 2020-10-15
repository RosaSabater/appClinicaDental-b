const mongoose = require('mongoose');
const CitaModel = require('../models/Cita');
const UsuarioModel = require('../models/Usuario');
const { ObjectID, ObjectId } = require('mongodb')

const nuevaCita = async (req, res) => {

    try {
        let { fecha, usuarioId, motivo } = req.body;

        let cita = await CitaModel.create({
            fecha: new Date(fecha),
            usuarioId: ObjectID(usuarioId),
            motivo: motivo
        });

        res.send(cita);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'No se ha podido crear la cita.' });
    }
};


const citas = async (req, res) => {

    try {
        let usuarioId = req.params.id;

        let citas = await CitaModel.find({ usuarioId: ObjectID(usuarioId) });
        res.send(citas)

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'No se han encontrado citas' });
    }
};

// const cancelarCita = async (req, res) => {

//     try {

//         let borrar = await CitaModel.deleteOne({ usuarioId: ObjectID(usuario._id) });

//     } catch (error) {
        
//     }
// }


module.exports = { nuevaCita, citas };