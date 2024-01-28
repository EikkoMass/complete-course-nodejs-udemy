module.exports.iniciaChat = function (application, req, res) {
  let dadosForm = req.body;
  req.assert('apelido', 'Nome ou Apelido e obrigatorio').notEmpty();
  req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

  let validacao = req.validationErrors();

  if (validacao) {
    res.render('index', { validacao });
    return;
  }
  application.get('io').emit('msgParaCliente', { apelido: dadosForm.apelido, mensagem: 'acabou de entrar no chat' });

  res.render('chat');
}