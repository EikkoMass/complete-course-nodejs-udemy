module.exports = {
  cadastro: function (application, req, res) {
    res.render('cadastro', {validacao: {}, dadosForm: {}})
  },

  cadastrar: function (application, req, res) {
    let dadosForm = req.body;

    req.assert('nome', 'Nome nao pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuario nao pode ser vazio').notEmpty();
    req.assert('senha', 'Senha nao pode ser vazia').notEmpty();
    req.assert('casa', 'Casa nao pode ser vazia').notEmpty();

    let erros = req.validationErrors();

    if(erros) {
      res.render('cadastro', {validacao: erros, dadosForm});
      return;
    }

    let connection  = application.config.dbConnection;

    let UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    
    UsuariosDAO.inserirUsuario(dadosForm);

    res.send('podemos cadastrar');
  }
}