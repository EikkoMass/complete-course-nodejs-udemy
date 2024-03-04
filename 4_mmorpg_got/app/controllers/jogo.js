module.exports = {

  jogo: function (application, req, res) {

    if (!req.session.autorizado) {
      res.send('Usuario precisa fazer o login');
      return;
    } 

    let comando_invalido = 'N';

    if(req.query.comando_invalido === 'S')
    {
      comando_invalido = 'S';
    }

    let connection = application.config.dbConnection;
    let JogoDAO = new application.app.models.JogoDAO(connection);
    let usuario = req.session.usuario;
    let casa = req.session.casa;

    JogoDAO.iniciaJogo(res, usuario, casa, comando_invalido);
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
      res.redirect('jogo?comando_invalido=S');
      return;
    }

    console.log(dadosForm);
    res.send('tudo ok!');
  }
}