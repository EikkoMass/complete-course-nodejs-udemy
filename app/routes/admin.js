module.exports = function (application) {
    application.get('/formulario_inclusao_noticia', function (req, res) {
        res.render('admin/form_add_noticia');
    });


    application.post('/noticias/salvar', (req, res) => {
        let noticia = req.body;

        let connection = application.config.dbConnection;
        let noticiasModel = new application.app.models.NoticiasDAO(connection);

        noticiasModel.salvarNoticia(noticia, (error, result) => {
            res.redirect('/noticias');
        });
    });
}