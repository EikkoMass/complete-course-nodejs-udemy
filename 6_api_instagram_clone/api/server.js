const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 8080;

app.listen(port);

console.log(`Servidor HTTP esta escutando a porta ${port}`);

app.get('/', function(req, res) {

  res.send({
    msg: 'Hello'
  });
});