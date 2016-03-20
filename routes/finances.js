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


// READ
router.get('/:id', function(req, res) {
	var Id = req.params.id;
	connection.query('SELECT * FROM HouseholdFinances WHERE HouseId = ' + Id, function (err, rows, fields) {
		if (err) throw err;
		res.json(rows);
	});
});


