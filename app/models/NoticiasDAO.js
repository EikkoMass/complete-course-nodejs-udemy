function NoticiasDAO(connection) {
  this._connection = connection;

}

NoticiasDAO.prototype.getNoticias = function (callback) {

  this._connection.query("SELECT * FROM noticias", callback);
}

NoticiasDAO.prototype.getNoticia = function (callback) {
  this._connection.query(`SELECT * FROM noticias where id_noticia = ${2}`, callback);
}

NoticiasDAO.prototype.salvarNoticia = function (noticia, callback) {
  this._connection.query(`INSERT INTO noticias set ?`, noticia, callback);
}

module.exports = () => NoticiasDAO