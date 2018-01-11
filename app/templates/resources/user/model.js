var db = require('../../config/db');

var schema = new db.mongoose.Schema({
  created_at: Date
},{collection: 'user'});

// Import Model methods to mongoose records
schema.methods = {
  sayHello: function(){
    return "Hello, I'm "+this._id;
  }
};

module.exports = db.mongoose.model('User', schema);
