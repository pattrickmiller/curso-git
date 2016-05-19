module.exports = function(app){
	
	app.get("/produtos",function(req,res){

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, results){
			//res.render('produtos/lista', {lista: results});

			res.format({
				html: function(){
					res.render('produtos/lista', {lista: results});
				},
				json: function(){
					res.json(results);
				}
			});
		});
		
		connection.end();

	});

	app.get("/produtos/form",function(req,res){

		res.render('produtos/form',{validationErrors:{}, produto:{}});

	});	

	app.post("/produtos/",function(req,res){

		var produto = req.body;
		console.log(produto);

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		req.assert('titulo','Titulo deve ser preenchido').notEmpty();
		req.assert('preco','Preco deve ser um número').isFloat();

		var errors = req.validationErrors();
		if(errors){

			res.status(400);

			res.format({
				html: function(){
					res.render('produtos/form',
						{validationErrors:errors, produto:produto}
						);
				},
				json: function(){
					res.json(errors);
				}
			});
			
			return;
		}

		produtosDAO.salva(produto,function(err, results){
			console.log(err);
			res.redirect('/produtos');
		});

		connection.end();

	});	
}