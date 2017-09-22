const express = require('express')
const ClienteSchema = require('../schemas/cliente')
const passwordHash = require('password-hash')
const jtw = require('express-jwt')

let router = express.Router()

router.post('/cliente', (req, res) => {
    let cliente = new ClienteSchema(req.body);
    cliente.senha = passwordHash.generate(req.body.senha);

    cliente.save((err, result) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).send(result);
    })
})

module.exports = router;