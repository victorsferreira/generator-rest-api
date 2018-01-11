var config = require('./');

module.exports = function(app){
    // Not Found
    app.use(function(req,res,next){
        var err = new Error('Not found');
        err.status = 404;
        next(err);
    });

    // Error
    app.use(function(err,req,res,next){
      res.status(err.status || 500).json(err.message);
    });

};
