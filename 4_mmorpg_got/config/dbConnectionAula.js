/* importar o mongodb */
let mongo = require('mongodb');

let connMongoDb = function () {
  let db = new mongo.Db(
    'got', /* nome do banco */
    new mongo.Server(
      'localhost', /* endereco do server onde esta o mongo */
      27017, /* porta de conexao ao banco */
      {} /* opcoes de configuracao do servidor */
    ),
    {} /* opcoes de configuracao da conexao com o banco */
  );

  return db;
};

module.exports = function () {
  return connMongoDb;
}