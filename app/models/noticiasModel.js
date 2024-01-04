module.exports = function () {

  this.getNoticias = (connection, callback) => {

    connection.query("SELECT * FROM noticias", callback);
  }

  this.getNoticia = (connection, callback) => {
    connection.query(`SELECT * FROM noticias where id_noticia = ${2}`, callback);
  }

  return this;
}