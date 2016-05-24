var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController: NODE_ENV = '+process.env.NODE_ENV, function(){

	beforeEach(function(done){

		var connection = express.infra.connectionFactory();
		connection.query("delete from livros", function(ex, result){

			if(!ex){
				done();
			} else {
				console.log(ex);
			}

		});

	});

	var produto = {
			titulo: 'teste supertest',
			preco: 123.30,
			descricao: 'teste cadastro produto'
	};

	var produto_invalido = {
			titulo: 'teste supertest invalido'
	};

	it('#listagem de produtos json', function(done){

		request.get('/produtos').set('Accept','application/json').expect('Content-Type',/json/).expect(200, done);

	});

	it('#cadastro de produtos json com dados invalidos', function(done){

		request.post('/produtos').set('Accept','application/json')
		.set('Content-Type','application/json')
		.set('method','post')
		.send(produto_invalido)
		.expect(400, done);

	});

	it('#cadastro de produtos json com dados validos', function(done){

		request.post('/produtos').set('Accept','application/json')
		.set('Content-Type','application/json')
		.set('method','post')
		.send(produto)
		.expect(302, done);

	});
		
});
