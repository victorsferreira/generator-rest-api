process.on('uncaughtException', function(err){
  //log
  console.log(err);
});

var config = require('./config');
var app = require('./config/express');
var db = require('./config/db');

module.exports = app.listen(config.port,function(){
  db.connect(config.db);

  console.log('Server listening to port '+config.port);
});
