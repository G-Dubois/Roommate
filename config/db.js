var mysql = require = require('mysql');

var connection = mysql.createConnection({
	
	//add your own
	host: 		'',
	user: 		'',
	password: 	'',
	database:	'Room8',
});
connection.connect();

module.exports = connection();
