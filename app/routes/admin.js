module.exports = function (application) {
    application.get('/formulario_inclusao_noticia', function (req, res) {
        res.render('admin/form_add_noticia', { validacao: {}, noticia: {} });
    });


    application.post('/noticias/salvar', (req, res) => {
        let noticia = req.body;

        req.assert('titulo', 'Titulo e obrigatorio').notEmpty();
        req.assert('resumo', 'Resumo e obrigatorio').notEmpty();
        req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
        req.assert('autor', 'Autor e obrigatorio').notEmpty();
        req.assert('data_noticia', 'Data e obrigatoria').notEmpty().isDate({ format: 'YYYY-MM-DD' });
        req.assert('noticia', 'Noticia e obrigatoria').notEmpty();

        let erros = req.validationErrors();

        if (erros) {
            res.render('admin/form_add_noticia', { validacao: erros, noticia });
            return;
        }

        let connection = application.config.dbConnection;
        let noticiasModel = new application.app.models.NoticiasDAO(connection);

        noticiasModel.salvarNoticia(noticia, (error, result) => {
            res.redirect('/noticias');
        });
    });
}