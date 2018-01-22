var express = require('express');
var router = express.Router();

var middlewares = require('./middlewares');
var controller = require('./controller');

router.get('/',controller.index.bind(controller));
router.get('/:_id',controller.show.bind(controller));
router.post('/',controller.create.bind(controller));
router.put('/:_id',controller.edit.bind(controller));
router.delete('/:_id',controller.remove.bind(controller));

module.exports = router;
