const express = require('express');
const mongoose = require('./config/dbconnect.js');
const auth = require('./middleware/auth.js');
const { validameConfig } = require("validame");
validameConfig.language = "es";


const app = express();
const PORT = process.env.PORT || 3001;


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



app.get('/', (req,res)=>res.send('Bienvenido'));

// Importes modulares
const { registro, login, logout, baja } = require('./controllers/UsuarioController');
const { nuevaCita, citas, cancelarCita } = require('./controllers/CitasController');
const { mostrarUsuarios, buscarUsuariosId, mostrarCitas } = require('./controllers/AdminController');

//endpoints admin
app.get('/admin/mostrarUsuarios', auth, mostrarUsuarios);
app.get('/admin/mostrarCitas', auth, mostrarCitas);
app.get('/admin/:id', auth, buscarUsuariosId);


//endpoins usuario
app.post('/registro', registro);
app.post('/areaclientes/login', login);
app.get('/areaclientes/logout', auth, logout);
app.delete('/areaclientes/baja', auth, baja);


//endpoints cita
app.post('/areaclientes/nuevacita', auth, nuevaCita);
app.get('/areaclientes/citas/:id', auth, citas);
app.put('/areaclientes/cancelarcita/:id', auth, cancelarCita);



