class <%= resource_class_name %>Controller{
  constructor(){
    this.dao = require('./dao');
  }

  index(req,res,next){
    try{
      res.status(200).json({message: '<%= resource_class_name %>#index'});
    }catch(e){
      next(e);
    }
  }
}

module.exports = new <%= resource_class_name %>Controller();
