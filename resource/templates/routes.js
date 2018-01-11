var express = require('express');
var router = express.Router();

var middlewares = require('./middlewares');
var controller = require('./controller');

router.get('/',controller.index.bind(controller));

module.exports = router;
