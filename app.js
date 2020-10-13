const express = require('express');
const mongoose = require('./config/mongoose.js');
const UsuarioModel = require ('./models/Usuario.js');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/registro', (req, res) => {
    UsuarioModel.create(req.body)
        .then(usuario => res.status(500).send(usuario))
        .catch(console.error)
})

app.get('/usuarios', (req, res) => {
    Usuario.find().then(usuarios => res.send(usuarios))
        .catch(console.error)
})
app.listen(PORT, () => console.log('server running on port ' + PORT));