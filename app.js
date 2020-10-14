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
const { mostrarUsuarios } = require('./controllers/UsuarioController');
const { registro } = require('./controllers/UsuarioController');
const { login } = require('./controllers/UsuarioController');
const { logout } = require('./controllers/UsuarioController');


//endpoints
app.get('/usuarios/mostrar', mostrarUsuarios);
app.post('/usuarios/registro', registro);
app.post('/usuarios/login', login);
app.get('/usuarios/logout', logout);

