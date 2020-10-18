const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const CitaModel = require('../models/Cita');
const { ObjectID, ObjectId } = require('mongodb');


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

const cancelarCita = async (req, res) => {

    try {
        let citaId = req.params.id;

        let borrar = await CitaModel.findByIdAndUpdate(citaId,
            { estado: 'cancelada' },
            { new: true, useFindAndModify: false }
        );

        res.send({ message: 'Se ha cancelado la cita correctamente.' })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'No se ha podido cancelar la cita.' });
    }
};


module.exports = { nuevaCita, citas, cancelarCita };