const express = require('express');
const app = express(); //initialized start ho jae
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/blockchain', function (req, res) {
  res.send(bitcoin);
});

app.post('/transaction', function (req, res) {
  bitcoin.createNewTransaction(req.body.amount, req.body.senderA, req.body.recipient);
});

app.listen(3000);