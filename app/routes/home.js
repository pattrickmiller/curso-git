module.exports = function(app){

	app.get('/', function(req,res, next){

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, results){

			if(err){
				return next(err);
			}

			res.format({

				html: function(){
					res.render('home/index', {livros: results});
				}

			}, {

				json: function(){
					res.json(results);
				}

			})

		});

		connection.end();

	});

};