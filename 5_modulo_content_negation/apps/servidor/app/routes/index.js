module.exports = function (application) {
	
	application.get('/', function (req, res) {
		res.render('xyz');


		/*
		res.format({
			html: function () {
				res.send('Bem vindo a sua app NodeJS!');
			},

			json: function () {
				const retorno = {
					body: 'Bem vindo a sua app NodeJS!'
				}
				res.json(retorno);
			}
		});

		*/
	});

	

	application.post('/', function (req, res) {
		res.send(req.body);
	});
}