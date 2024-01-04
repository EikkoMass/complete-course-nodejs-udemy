module.exports = application => {
    application.get('/noticias', (req, res) => {

        let connection = application.config.dbConnection;
        let noticiasModel = application.app.models.noticiasModel;

        noticiasModel.getNoticias(connection, (error, result) => {
            res.render('noticias/noticias', { noticias: result });
        });
    });
}