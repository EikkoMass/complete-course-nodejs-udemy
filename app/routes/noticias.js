let db = require('../../config/dbConnection')();

module.exports = app => {
    app.get('/noticias', (req, res) => {

        db.query("SELECT * FROM noticias", function (error, result) {
            res.render('noticias/noticias', { noticias: result });
        });

    });
}