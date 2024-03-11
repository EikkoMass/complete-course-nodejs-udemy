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

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg) {
  
  this._connection(async access => {
    const collection = access.collection('jogo');

    let jogo = await collection.findOne({usuario});

    res.render('jogo', {img_casa: casa, jogo, msg})
  });
}

JogoDAO.prototype.acao = function(acao) {

  this._connection(async access => {
    const collection_acao = access.collection('acao');

    let date =  new Date();
    let tempo = null;

    switch (parseInt(acao.acao)) {
      case 1:
        tempo = 1 * 60 * 60000;
        break;
      case 2:
        tempo = 2 * 60 * 60000;
        break;
      case 3:
        tempo = 5 * 60 * 60000;
        break;
      case 4:
        tempo = 5 * 60 * 60000;
        break;
    }

    acao.acao_termina_em = date.getTime() + tempo;

    await collection_acao.insertOne(acao);

    let collection_jogo = access.collection('jogo');
    let moedas = null;

    switch (parseInt(acao.acao)) {
      case 1:
        moedas = -2;
        break;
      case 2:
        moedas = -3;
        break;
      case 3:
        moedas = -1;
        break;
      case 4:
        moedas = -1;
        break;
    }

    moedas *= acao.quantidade;

    await collection_jogo.updateOne({usuario: acao.usuario}, {$inc: {moeda: moedas}});
  });
}

JogoDAO.prototype.getAcoes = function(usuario, res) {
  this._connection(async access => {
    const collection = access.collection('acao');

    let date = new Date();
    let momento_atual = date.getTime();

    let acoes = await collection.find({usuario, acao_termina_em: {$gt: momento_atual}}).toArray();

    res.render('pergaminhos', {acoes});
  });
}

module.exports = function () {
  return JogoDAO;
}