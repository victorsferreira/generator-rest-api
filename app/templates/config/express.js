var config = require('./index');
var express = require('express');
var body_parser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
var cors = require('cors');
var app = express();

//add some security middlewares
app.use(helmet());

//default settings: allow CORS from origin as defined in configuration file
app.use(cors({
  origin: config.cors
}));

//parse body
app.use(body_parser.urlencoded({limit: '2mb', extended: false}));
app.use(body_parser.json({limit: '2mb'}));

//compress responses
app.use(compression());

app.use('/',require('./routes'));
require('./middlewares')(app);

module.exports = app;
