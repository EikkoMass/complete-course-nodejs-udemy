module.exports = {

  jogo: function (application, req, res) {

    if (!req.session.autorizado) {
      res.send('Usuario precisa fazer o login');
      return;
    } 

    let msg = '';

    if(req.query.msg !== '')
    {
      msg = req.query.msg;
    }

    let connection = application.config.dbConnection;
    let JogoDAO = new application.app.models.JogoDAO(connection);
    let usuario = req.session.usuario;
    let casa = req.session.casa;

    JogoDAO.iniciaJogo(res, usuario, casa, msg);
  },

  sair: function (application, req, res) {
    req.session.destroy(function(err) {
      res.render('index',{validacao: {}});
    });
  },

  suditos: function(application, req, res) {

    if (!req.session.autorizado) {
      res.send('Usuario precisa fazer o login');
      return;
    } 

    res.render('aldeoes', {validacao: {}});
  },

  pergaminhos: function(application, req, res) {

    if (!req.session.autorizado) {
      res.send('Usuario precisa fazer o login');
      return;
    } 

    res.render('pergaminhos', {validacao: {}});
  },

  ordenar_acao_sudito: function(application, req, res) {
    let dadosForm = req.body;

    req.assert('acao', 'Acao de ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    let erros = req.validationErrors();

    if(erros)
    {
      res.redirect('jogo?msg=A');
      return;
    }


    let connection  = application.config.dbConnection;
    let JogoDAO = new application.app.models.JogoDAO(connection);
    
    dadosForm.usuario = req.session.usuario;

    JogoDAO.acao(dadosForm);
    res.redirect('jogo?msg=B');
  }
}