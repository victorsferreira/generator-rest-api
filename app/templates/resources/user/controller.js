class UserController{
  constructor(){
    this.dao = require('./dao');
  }

  index(req,res,next){
    var self = this;
    this.dao.insertAsync(
      {
        created_at: new Date()
      }
    )
    .then(function(){
      return self.dao.findAllAsync();
    })
    .then(function(data){
      res.status(200).json(data);
    })
    .catch(function(err){
      next(err);
    });
  }
}

module.exports = new UserController();
