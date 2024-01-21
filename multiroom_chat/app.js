/* importar as configuracoes do servidor */
let app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(80, function() {
  console.log('Servidor Online');
})