var jwt = require('jsonwebtoken');
var config = require('./');

module.exports = function(app) {
    if(app){
        app.use(function(req, res, next) {
            console.log(new Date());
            next();
        });
    }

    return {
        notFound: function(req,res,next){
            var err = new Error('Not found');
            err.status = 404;
            next(err);
        }
    };
};
