const mongoose = require ('mongoose');


const CitaSchema = new mongoose.Schema({

    fecha: {
        type: Date,
        required: true
    },
    usuarioId: {
        type: mongoose.Types.ObjectId(),
        required: true
    },
    motivo: {
        type: String
    }





})

const CitaModel = mongoose.model('Cita', CitaSchema);
module.exports = CitaModel;