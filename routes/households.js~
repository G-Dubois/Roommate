// router for the households table

// requires
var express = require('express');
var router = express.Router();
var connection = require('../config/db');

// require
router.use(function(req, res, next) {
	// this will be run before any endpoint function
	next();
});

// CREATE
router.post('/', function (req, res) {
	connection.query('INSERT INTO Households SET ?', req.body, function(err,result) {
		if (err) throw err;
		var returnObject = {'created':true}
		res.json(returnObject);
	});
});

// READ
router.get('/', function(req, res) {
	connection.query('SELECT * FROM Households', function (err, rows, fields) {
		if (err) throw err;
		res.json(rows);
	});
});


// UPDATE
router.put('/:id', function (req, res) {
	var Id = req.params.id;
	connection.query('UPDATE Househoulds SET ?  WHERE HouseId = ' + Id, req.body, function(err, result){
	if (err) throw err;
	var returnObject = {'updated':true}
	res.json(returnObject);
	});

});

// DELETE
router.delete('/:id', function (req, res) {
        var Id = req.params.id;
        connection.query('DELETE FROM Households WHERE HouseId =' + Id + ';', function(err, result){
        if (err) throw err;
        var returnObject = {'deleted':true}
        res.json(returnObject);
        });
});

// makes fies useable as module for app.use() in main node file
module.exports = router;
