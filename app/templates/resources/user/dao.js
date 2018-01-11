var bluebird = require('bluebird');

class UserDAO{
  constructor(){
    this.model = require('./model');
  }

  findAll(cb){
    this.model.find({},cb);
  }

  insert(data,cb){
    this.model.create(data,cb);
  }
}

module.exports = bluebird.promisifyAll(new UserDAO());
