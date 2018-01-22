var fs = require('fs');
var config = require('../');


global['Controller'] = require('./Controller');
global['DAO'] = require('./DAO');

module.exports = {
    forEachModuleFilePattern: function(pattern,cb){
        var pattern = new RegExp(pattern);
        var path = this.resourcesPath(), current_path;
        var extension = 'js';
        if(typeof cb !== 'function') return;

        var recursivelyFindFiles = function(path){
            fs.readdirSync(path).forEach(function(entry){
                current_path = [path,entry].join('/');

                if(fs.statSync(current_path).isDirectory()){
                    recursivelyFindFiles(current_path);
                }else{
                    current_path_parts = current_path.split('.');
                    current_path_extension = current_path_parts.pop();
                    current_path_name = current_path_parts.join('.');

                    if(current_path_extension == extension && current_path_name.match(pattern)){
                        cb(entry,current_path);
                    }
                }
            });
        }

        recursivelyFindFiles(path);
    },
    forEachModuleFileType: function(file_type,cb){
        var path = this.resourcesPath(), current_path, file_name;
        var extension = 'js';

        if(file_type instanceof Array){
            if(file_type.length > 1) extension = file_type[1];
            file_type = file_type[0];
        }

        fs.readdirSync(path).filter(function(entry){
            current_path = [path,entry].join('/');
            if(fs.statSync(current_path).isDirectory()){
                file_name = [current_path,file_type+'.'+extension].join('/');
                if(fs.existsSync(file_name)){
                    cb(entry,file_name);
                }
            }
        });
    },
    ucwords: function(str){
        return str.replace(/\w\S*/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    },
    config: function(){
        return config;
    },
    rootPath: function(){
        return process.cwd();
    },
    resourcesPath: function(){
        return this.rootPath()+'/resources';
    }
};
