const express = require('express')
const expressJwt = require('express-jwt');
const ClienteSchema = require('../schemas/cliente')
const moment = require('moment')

let router = express.Router();

router.use(expressJwt({ secret: 'tokenized' }));

router.post('/simulacao', (req, res) => {

    let query = {
        _id: req.user._id
    }
    ClienteSchema.findOne(query, (err, cliente) => {
        let porcentagemRenda = cliente.renda * 0.3;
        let juros = 0;

        if (!req.body.valor || !req.body.parcelas || req.body.parcelas > 6 || req.body.valor > porcentagemRenda) {
            res.status(400).send('Invalid parameters');
            return;
        }
        juros = req.body.valor * 0.08;
        let parcela = (req.body.valor / req.body.parcelas) + juros;

        res.status(200).send({ parcela })
    })


})


router.put('/', (req, res) => {
    let query = {
        _id: req.user._id
    }

    let newData =
        {
            valor: req.body.valor,
            parcelas: req.body.parcelas,
            data: moment(new Date).format("DD/MM/YYYY")
        }



    ClienteSchema.findOne(query, (err, cliente) => {
        let porcentagemRenda = cliente.renda * 0.3;
        let juros = 0;

        if (!req.body.valor || !req.body.parcelas || req.body.parcelas > 6 || req.body.valor > porcentagemRenda) {
            res.status(400).send('Invalid parameters');
            return;
        }
        ClienteSchema.findOneAndUpdate(query, { $push: { emprestimos: newData } }, (err, clienteUpdated) => {
            if (err) {
                return res.status(500).send({ error: err })
            }

            res.status(200).send(clienteUpdated)
        })
    })

})



module.exports = router;