module.exports = application => {
  application.get('/noticia', (req, res) => {

    let connection = application.config.dbConnection;
    let noticiasModel = new application.app.models.NoticiasDAO(connection);

    noticiasModel.getNoticia(function (error, noticia) {
      res.render('noticias/noticia', { noticia });
    });

  });
}