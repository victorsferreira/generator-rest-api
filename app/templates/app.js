process.on('uncaughtException', function(err){
  //log
  console.log(err);
});

require('./config/helpers');
require('./config/autoload');
var config = require('./config');
var app = require('./config/express');
var db = require('./config/db');

app.use(function(err,req,res,next){
  console.log(err);
  res.status(err.status || 500).json(err.message);
});

module.exports = app.listen(config.port,function(){
  db.connect(config.db);

  console.log('Server listening to port '+config.port);
});
