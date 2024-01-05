module.exports = function () {

  this.getNoticias = (connection, callback) => {

    connection.query("SELECT * FROM noticias", callback);
  }

  this.getNoticia = (connection, callback) => {
    connection.query(`SELECT * FROM noticias where id_noticia = ${2}`, callback);
  }

  this.salvarNoticia = (noticia, connection, callback) => {
    connection.query(`INSERT INTO noticias set ?`, noticia, callback);
  }

  return this;
}