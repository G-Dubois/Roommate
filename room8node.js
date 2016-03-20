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

// example: var tableRouter = require('./routes/table');
var householdsRouter 	= require('./routes/households');
var tenantsRouter 	= require('./routes/tenants');
var billsRouter		= require('./routes/bills');

// use router instances.   example: app.use('/api/table', routerFile);
app.use('/api/households', householdsRouter);
app.use('/api/tenants', tenantsRouter);
app.use('/api/bills', billsRouter);

// app.use for all static files
app.use(express.static('static'));

// start the server the server
app.listen(port);
console.log('Room8 server started. U wot m8.  Listening for connections on port' + port);


