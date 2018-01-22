var config = require('./');
var bunyan = require('bunyan');
const log = bunyan.createLogger({name: "myapp", streams: [
    {
      type  : "rotating-file",
      level: 'error',
      path: './logs/myapp-error.log',
      period: '1d',
      count: 10
    }
  ]});


module.exports = function(app){
    // Not Found
    app.use(function(req,res,next){
        var err = new Error('Not found');
        err.status = 404;
        next(err);
    });

    // Error
    app.use(function(err,req,res,next){
      log.error({message: err.message, stack: err.stack, status: err.status, time: new Date().toString()});
      res.status(err.status || 500).json(err.message);
    });

};
