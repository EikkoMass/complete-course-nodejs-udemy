/* importar as configuracoes do servidor */
let app = require('./config/server');

/* parametrizar a porta de escuta */
let server = app.listen(80, function () {
  console.log('Servidor Online');
});

let io = require('socket.io').listen(server);

app.set('io', io);

/* Criar a conexao por websocket */
io.on('connection', socket => {
  console.log('usuario conectou');

  socket.on('disconnect', () => {
    console.log('usuario desconectou');
  });

  socket.on('msgParaServidor', data => {
    /* retorna para o usuario que requisitou o socket*/
    socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem });
    
    /* retorna para todos os usuarios que estao conectados no socket (exceto o que requisitou)*/
    socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem });
  });
});
