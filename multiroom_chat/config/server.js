/*  importar o modulo do framework express */
let express = require('express');

/* importar o modulo do consign */
let consign = require('consign');

/* importar o modulo do body-parser */
let bodyParser = require('body-parser');

/* importar o modulo do express-validator */
let expressValidator = require('express-validator');

let app = express();

/* setar as variaveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

app.use(bodyParser.urlencoded({ extended: true }));

/* configurar o middleware do express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app*/
consign()
      .include('app/routes')
      .include('app/models')
      .include('app/controllers')
      .into(app);

/* exportar o objeto app */
module.exports = app;