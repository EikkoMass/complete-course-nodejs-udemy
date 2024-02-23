function UsuariosDAO(connection) {
  this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function (usuario) {
  this._connection(async access => {
    const collection = access.collection('usuarios');
    await collection.insertOne(usuario);
  });
}

module.exports = function () {
  return UsuariosDAO;
}