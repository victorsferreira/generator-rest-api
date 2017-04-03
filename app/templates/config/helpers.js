var fs = require('fs');

var Helper = {};

Helper.rootPath = function(){
  return __dirname+'/../';
};

Helper.configPath = function(){
  return __dirname;
};

Helper.config = function(){
  return require(Helper.configPath());
};

Helper.ucwords = function(str){
  return str.replace(/\w\S*/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

Helper.forEachModuleFileType = function(file_type,cb){
  var config = Helper.config();
  var path = config.path.modules, current_path, file_name;
  var extension = 'js';

  if(file_type instanceof Array){
    if(file_type.length > 1) extension = file_type[1];
    file_type = file_type[0];
  }

  fs.readdirSync(path).filter(function(entry){
    //Para cada pasta interna a modules
    current_path = [path,entry].join('/');
    if(fs.statSync(current_path).isDirectory()){
      file_name = [current_path,file_type+'.'+extension].join('/');
      if(fs.existsSync(file_name)){
        cb(entry,file_name);
      }
    }
  });
};

Helper.forEachModuleFilePattern = function(pattern,cb){
  var pattern = new RegExp(pattern);
  var config = Helper.config();
  var path = config.path.modules, current_path;
  var extension = 'js';
  if(typeof cb !== 'function') return;

  var recursivelyFindFiles = function(path){
    fs.readdirSync(path).forEach(function(entry){
      //Para cada pasta interna a modules
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
};

Helper.upload = function(req,name,callback){
  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../files/logo');
  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  var uploaded_files = [];
  form.on('file', function(field, file) {
    // var filename = path.join(form.uploadDir, file.name);
    var extension = file.name.split('.').pop();
    name = name+'.'+extension;
    var filename = path.join(form.uploadDir, name);
    uploaded_files.push(filename);
    fs.rename(file.path, filename);
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    // res.status(200).json({
    //   result: true
    // });
    callback(uploaded_files);
  });

  // parse the incoming request containing the form data
  form.parse(req);
}

Helper.forEachFile = function(path,cb){
  var current_path;
  if(path.charAt(0) == '.') path = path.substr(1);
  path = Helper.rootPath()+path;

  var recursivelyFindFiles = function(path){
    fs.readdirSync(path).filter(function(entry){
      current_path = [path,entry].join('/');
      if(fs.statSync(current_path).isDirectory()){
        recursivelyFindFiles(current_path,cb);
      }else{
        cb(entry,current_path,path);
      }
    });
  }

  recursivelyFindFiles(path);
};

Helper.moduleFile = function(module,file_type,cb){
  var config = Helper.config();
  var path = config.path.modules+'/'+module+'/'+file_type+'.js';
  cb(require(path));
};

Helper.moduleFileSync = function(module,file_type){
  var config = Helper.config();
  var path = config.path.modules+'/'+module+'/'+file_type+'.js';
  return require(path);
};

global.Helper = Helper;

Helper.forEachModuleFileType('helpers',function(entry,file_name){
  Helper[entry] = require(file_name);
});
