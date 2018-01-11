var express = require('express');
var config = require('./');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var Core = require('./core');

router.get('/',function(req,res){
  res.status(200).send('I\'m alive!');
});

Core.forEachModuleFileType('routes',function(entry,file_name){
  router.use('/'+entry,require(file_name));
});

module.exports = router;
