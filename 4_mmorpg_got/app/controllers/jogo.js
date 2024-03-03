module.exports = {

  jogo: function (application, req, res) {

    if (!req.session.autorizado) {
      res.send('Usuario precisa fazer o login');
      return;
    } 

    let connection = application.config.dbConnection;
    let JogoDAO = new application.app.models.JogoDAO(connection);
    let usuario = req.session.usuario;
    let casa = req.session.casa;

    JogoDAO.iniciaJogo(res, usuario, casa);
  },

  sair: function (application, req, res) {
    req.session.destroy(function(err) {
      res.render('index',{validacao: {}});
    });
  },

  suditos: function(application, req, res) {
    res.render('aldeoes', {validacao: {}});
  },

  pergaminhos: function(application, req, res) {
    res.render('pergaminhos', {validacao: {}});
  }
}