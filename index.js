const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const clienteController = require('./controllers/cliente')
const loginController = require('./controllers/login')
const emprestimoController = require('./controllers/emprestimo')

const app = express();

mongoose.connect('mongodb://localhost/emprestimo');

app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    res.status(200).send('Hello World')
})


app.use('/clientes', clienteController);
app.use('/login', loginController);
app.use('/emprestimos', emprestimoController);

app.listen(3000, () => {
    console.log('Servidor incializado')
})