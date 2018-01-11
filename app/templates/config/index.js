var fs = require('fs');

var config = {
    secret: '<%= secret %>',
    cors: '*',
    expose_current_version: false
};

var environment = process.env.NODE_ENV || 'default';
var path = './env/'+environment;
if (!fs.existsSync(path)){
    var env_config = require(path);
    if(typeof env_config === 'object') config = Object.assign(config,env_config);
    config.env = environment;
}

module.exports = config;
