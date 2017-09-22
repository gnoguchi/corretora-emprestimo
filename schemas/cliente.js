const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ClienteSchema = mongoose.model('Cliente', {
    nome: { type: String, required: true },
    renda: { type: Number, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    emprestimos: []
})

module.exports = ClienteSchema;