let mysql = require('mysql');

module.exports = () =>
  mysql.createConnection({
    host: 'localhost',
    user: 'YOUR_USER_HERE',
    password: 'YOUR_PASSWORD_HERE',
    database: 'portal_noticias'
  })
