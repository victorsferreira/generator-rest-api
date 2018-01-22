class UserController{
  constructor(){
    this.dao = require('./dao');
  }

  index(req,res,next){
    this.dao.findAllAsync()
    .then(function(data){
      res.status(200).json(data);
    })
    .catch(function(err){
      next(err);
    });
  }

  show(req,res,next){
    this.dao.findOneAsync(req.params._id)
    .then(function(data){
      if(data.length) res.status(200).json(data[0]);
      else res.status(404).end();
    })
    .catch(function(err){
      next(err);
    });
  }

  create(req,res,next){
    this.dao.createAsync(req.body)
    .then(function(data){
      res.status(201).json(data);
    })
    .catch(function(err){
      next(err);
    });
  }

  edit(req,res,next){
    var _id = req.params._id;
    this.dao.editAsync(_id, req.body)
    .then(function(data){
      if(data.n > 0){
        if(data.nModified > 0) res.status(200).end();
        else res.status(400).json('User not found');
      }else res.status(404).end();
    })
    .catch(function(err){
      next(err);
    });
  }

  remove(req,res,next){
    this.dao.removeAsync(req.params._id)
    .then(function(data){
      if(data.n > 0){
        if(data.nModified > 0) res.status(200).end();
        else res.status(400).json('User not found');
      }else res.status(404).end();
    })
    .catch(function(err){
      next(err);
    });
  }
}

module.exports = new UserController();
