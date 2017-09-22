const express = require('express')
const jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')
const ClienteSchema = require('../schemas/cliente')

let router = express.Router()

router.post('/', (req, res) => {
    const query = {
        email: req.body.email
    }
    ClienteSchema.findOne(query, (err, cliente) => {
        if (cliente && passwordHash.verify(req.body.senha, cliente.senha)) {
            const token = jwt.sign({ _id: cliente._id }, 'tokenized');

            res.set('Authorization', token)
            res.send(cliente)
            return;
        }

        res.sendStatus(400);
    })
})

module.exports = router;