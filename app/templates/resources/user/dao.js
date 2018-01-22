var bluebird = require('bluebird');

class UserDAO{
  constructor(){
    this.model = require('./model');
  }

  findAll(cb){
    this.model.find({},cb);
  }

  findOne(id, cb){
    this.model.find({_id: id},cb);
  }

  create(data,cb){
    this.model.create(data,cb);
  }

  edit(_id, data,cb){
    this.model.update({_id: _id}, {$set: data}, cb);
  }

  remove(_id, data,cb){
    this.model.remove({_id: _id}, cb);
  }
}

module.exports = bluebird.promisifyAll(new UserDAO());
