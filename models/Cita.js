const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const CitaSchema = new mongoose.Schema({

    fecha: {
        type: Date,
        required: true
    },
    usuarioId: {
        type: ObjectId
    },
    citaId: {
        type: ObjectId
    },
    motivo: {
        type: String
    }

})

const CitaModel = mongoose.model('cita', CitaSchema);
module.exports = CitaModel;