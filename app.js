var express = require('express')

var app = express()

const port = 3000

const pry = require('pry')

const mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));

const dbConfig = require('./config/db')(app,mongoose,port);

//configuration
require('./config/initializer')(app,express);

//Routes
//require('./config/route.js')(app);

//Auth
require('./controllers/passport_controller')(app,mongoose,dbConfig)




