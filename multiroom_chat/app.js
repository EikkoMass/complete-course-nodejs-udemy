/* importar as configuracoes do servidor */
let app = require('./config/server');

/* parametrizar a porta de escuta */
let server = app.listen(80, function () {
  console.log('Servidor Online');
});

let io = require('socket.io').listen(server);

/* Criar a conexao por websocket */
io.on('connection', (socket) => {
  console.log('usuario conectou');

  socket.on('disconnect', () => {
    console.log('usuario desconectou');
  });
});
