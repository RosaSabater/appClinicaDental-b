const UsuarioModel = require('../models/Usuario');
const CitaModel = require('../models/Cita');



const mostrarUsuarios = async (req, res) => {

    const token = req.headers.authorization;

    let esAdmin = await comprobarAdmin(token);

    if (!esAdmin) {
        return res.status(403).send({ message: 'Permisos insuficientes.' });
    }

    let usuarios = await UsuarioModel.find();
    res.send(usuarios)
};


const mostrarCitas = async (req, res) => {

    const token = req.headers.authorization;

    let esAdmin = await comprobarAdmin(token);

    if (!esAdmin) {
        return res.status(403).send({ message: 'Permisos insuficientes.' });
    };

    let citas = await CitaModel.find({});
    
    res.send(citas)

};


const buscarUsuariosId = async (req, res) => {

    const token = req.headers.authorization;

    let esAdmin = await comprobarAdmin(token);

    if (!esAdmin) {
        return res.status(403).send({ message: 'Permisos insuficientes.' });
    }

    try {
        let usuarios = await UsuarioModel.findById(req.params.id);
        res.send(usuarios);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'No se ha podido encontrar usuarios.' });
    }
};


const comprobarAdmin = async (token) => {

    let encontrado = await UsuarioModel.findOne({ token: token });

    return encontrado.rol === "admin";
}

module.exports = { mostrarUsuarios, buscarUsuariosId, mostrarCitas }