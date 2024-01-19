module.exports.noticias = (application, req, res) => {
  let connection = application.config.dbConnection;
  let noticiasModel = new application.app.models.NoticiasDAO(connection);

  noticiasModel.getNoticias((error, noticias) => {
    res.render('noticias/noticias', { noticias });
  });
}

module.exports.noticia = (application, req, res) => {
  let connection = application.config.dbConnection;
  let noticiasModel = new application.app.models.NoticiasDAO(connection);

  let id_noticia = req.query.id_noticia;

  noticiasModel.getNoticia(id_noticia, function (error, noticia) {
    res.render('noticias/noticia', { noticia });
  });
}