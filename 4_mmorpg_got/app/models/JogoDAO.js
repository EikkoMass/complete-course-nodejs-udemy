function JogoDAO(connection) {
  this._connection = connection;
}

JogoDAO.prototype.gerarParametros = function(usuario) {
  this._connection(async access => {
    const collection = access.collection('jogo');
    await collection.insertOne({
      usuario: usuario,
      moeda: 15,
      suditos: 10,
      temor: Math.floor(Math.random() * 1000),
      sabedoria: Math.floor(Math.random() * 1000),
      comercio: Math.floor(Math.random() * 1000),
      magia: Math.floor(Math.random() * 1000)
    });
  });
}


module.exports = function () {
  return JogoDAO;
}