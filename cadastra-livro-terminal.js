var http = require('http');

var configuracoes = {
	hostname: 'localhost',
	port: 3000,
	path: '/produtos',
	headers: {
		'Accept': 'application/json',
		'Content-type': 'application/json'
	}
};

var cliente = http.request(configuracoes, function(res){
	console.log(res.statusCode);
	res.on('data', function(body){
		console.log('Corpo: '+body);
	})
})

var produto = {
	titulo:'mais sobre node',
	descricao: 'node, javascript e um pouco de http',
	preco: 29.5
}

cliente.end(JSON.stringify(produto));