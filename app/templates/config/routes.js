var express = require('express');
var config = require('./');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

router.get('/',function(req,res){
  res.status(200).send('I\'m alive!');
});

Helper.forEachModuleFileType('routes',function(entry,file_name){
  router.use('/'+entry,require(file_name));
});

router.use(middlewares.notFound);

module.exports = router;
