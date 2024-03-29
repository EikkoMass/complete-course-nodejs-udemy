const crypto = require('crypto');

function UsuariosDAO(connection) {
  this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function (usuario) {
  this._connection(async access => {
    const collection = access.collection('usuarios');

    usuario.senha = crypto.createHash('md5').update(usuario.senha).digest('hex');

    await collection.insertOne(usuario);
  });
}

UsuariosDAO.prototype.autenticar = function (usuario, req, res) {

  this._connection(async access => {
    const collection = access.collection('usuarios');

    usuario.senha = crypto.createHash('md5').update(usuario.senha).digest('hex');

    let result = await collection.find(usuario).toArray();

      if(result[0])
      {
        req.session.autorizado = true;
        req.session.usuario = result[0].usuario;
        req.session.casa = result[0].casa;
      }

      if (req.session.autorizado) {
        res.redirect('jogo');
      } else {
        res.render('index', {msg: 'A', validacao: {}})
      }
  });

}

module.exports = function () {
  return UsuariosDAO;
}