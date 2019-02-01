require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const logger       = require('morgan');

require('./configs/database')

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// default value for title local
app.locals.title = 'Meter Reader - Task #2 - Vermietet.de';


// Route for my system
app.use('/', require('./routes/index'));

//route used to simulate an external API
app.use('/external', require('./routes/external'));   


module.exports = app;
