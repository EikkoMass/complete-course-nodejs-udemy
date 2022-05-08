const http = require('http');

const server = http.createServer((req, res) => {
  res.end(`<html><body>Portal de ${req.url.replace('/', '') || 'Notícias'}</body></html>`);
});

server.listen(3000);
