module.exports = {
  index: function (application, req, res) {
    res.render('index', {validacao: {}})
  },
  autenticar: function (application, req, res) {
    
    let dadosForm = req.body;
    
    req.assert('usuario', 'Usuario nao deve ser vazio').notEmpty();
    req.assert('senha', 'Senha nao deve ser vazia').notEmpty();

    let erros = req.validationErrors();
  
    if(erros) {
      res.render('index', {validacao: erros})
    }
  
    res.send('certo');
  }
}