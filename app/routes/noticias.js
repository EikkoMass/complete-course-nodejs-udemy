module.exports = app => {
    app.get('/noticias', (req, res) => {

        let connection = app.config.dbConnection;

        connection.query("SELECT * FROM noticias", function (error, result) {
            res.render('noticias/noticias', { noticias: result });
        });

    });
}