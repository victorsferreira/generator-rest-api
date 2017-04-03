var config = require('./index');
var express = require('express');
var body_parser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
var cors = require('cors');
var session = require('express-session');
var app = express();

app.use(helmet());
app.use(cors({
  origin: config.cors
}));

app.use(body_parser.urlencoded({limit: '2mb', extended: false}));
app.use(body_parser.json({limit: '2mb'}));
app.use(compression());
app.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

require('./middlewares')(app);

app.use('/',require('./routes'));

module.exports = app;
