console.log('Running as process ' + process.pid);

// call the packages we need
var express 	= require('express');
var app		= express();
var bodyParser 	= require('body-parser');
var connection 	= require('./config/db');


// configure bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port 
var port = process.env.PORT || 8080;

// routes for api

// get an instance of the express Router
var router = express.Router(); 

// example: var tableRouter = require(./routes/table');
