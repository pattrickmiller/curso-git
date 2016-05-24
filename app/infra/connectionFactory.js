var mysql = require('mysql');

function createDBConnection(){

	if(!process.env.NODE_ENV || process.env.NODE_ENV === 'dev'){

		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'admin',
			database: 'casadocodigo_nodejs'});

	};

	if(process.env.NODE_ENV === 'test'){

		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'admin',
			database: 'casadocodigo_nodejs_teste'});

	};

};

module.exports = function(){
	return createDBConnection;
};
		