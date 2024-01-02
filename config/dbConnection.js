let mysql = require('mysql');

let connMySql = mysql.createConnection({
  host: 'localhost',
  user: 'YOUR_USER_HERE',
  password: 'YOUR_PASSWORD_HERE',
  database: 'portal_noticias'
});

module.exports = () => connMySql;
