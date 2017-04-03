var fs = require('fs');

var config = {
    secret: '<%= secret %>',
    path:{
        root: Helper.rootPath(),
        log: Helper.rootPath()+'/error.log',
        resources: Helper.rootPath()+'resources'
    },
    cors: '*',
    expose_current_version: false
};

var environment = process.env.NODE_ENV || 'default';
var path = config.path.root+'/config/env/'+environment;
if (!fs.existsSync(path)){
    var env_config = require(path);
    if(typeof env_config === 'object') config = Object.assign(config,env_config);
    config.env = environment;
}

module.exports = config;
