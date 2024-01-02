module.exports = app => {
  app.get('/noticia', (req, res) => {

      let connection = app.config.dbConnection;

      connection.query(`SELECT * FROM noticias where id_noticia = ${2}`, function (error, result) {
          res.render('noticias/noticia', { noticia: result });
      });

  });
}