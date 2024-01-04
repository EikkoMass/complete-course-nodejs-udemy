module.exports = application => {
  application.get('/noticia', (req, res) => {

    let connection = application.config.dbConnection;
    let noticiasModel = application.app.models.noticiasModel;

    noticiasModel.getNoticia(connection, function (error, result) {
      res.render('noticias/noticia', { noticia: result });
    });

  });
}