const express = require('express');
const mongoose = require('./config/dbconnect.js');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


// Error CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.listen(PORT, () => console.log('server running on port ' + PORT));



// Importes modulares
const { mostrarUsuarios, buscarUsuariosId, registro, login, logout } = require('./controllers/UsuarioController');
const { nuevaCita } = require('./controllers/CitasController');

//endpoints admin
app.get('/admin/usuarios/mostrar', mostrarUsuarios);
app.get('/admin/usuarios/:id', buscarUsuariosId);


//endpoins usuario
app.post('/registro', registro);
app.post('/areaclientes/login', login);
app.get('/areaclientes/logout', logout);
app.post('/areaclientes/nuevacita', nuevaCita);
// app.get('/areacliente/citas', citas);

// app.delete('/areaclientes/baja', baja);
// app.post('/areacliente/cancelarcita', cancelarCita);


