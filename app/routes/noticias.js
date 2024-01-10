module.exports = application => {
    application.get('/noticias', (req, res) => {

        let connection = application.config.dbConnection;
        let noticiasModel = new application.app.models.NoticiasDAO(connection);

        noticiasModel.getNoticias((error, noticias) => {
            res.render('noticias/noticias', { noticias });
        });
    });
}