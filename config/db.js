var mysql = require = require('mysql');

var connection = mysql.createConnection({

	//add your own
	host: 		'',
	user: 		'root',
	password: 	'kag7ed1t',
	database:	'room8',
});
connection.connect();

module.exports = connection;
