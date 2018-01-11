var bluebird = require('bluebird');

class <%= resource_class_name %>DAO{
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

module.exports = bluebird.promisifyAll(new <%= resource_class_name %>DAO());
