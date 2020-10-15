const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const CitaSchema = new mongoose.Schema({

    fecha: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        default: 'pendiente',
        enum: ['pendiente', 'cancelada', 'completada']
    },
    usuarioId: {
        type: ObjectId
    },
    motivo: {
        type: String
    }

});

CitaSchema.methods.toJSON = function () {
    const cita = this.toObject();
    delete cita.__v;
    return cita;
};

const CitaModel = mongoose.model('cita', CitaSchema);
module.exports = CitaModel;