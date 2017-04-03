Helper.forEachFile('config/autoload',function(file_name,file_path,path){
  if(file_name == 'index.js') return false;
  var parts = path.split('/');
  parts = parts.slice(parts.indexOf('autoload') + 1);

  var prefix = Helper.ucwords(parts.join(' ')).replace(/ /,'');
  var module = require(file_path);
  var module_name = module.name;
  if(!module_name){
    module_name = file_name.split('.')
    module_name.pop();
    module_name = Helper.ucwords(module_name.join(' ')).replace(/ /,'');
  }

  module_name = module_name.charAt(0).toUpperCase() + module_name.substr(1);
  module_name = prefix+module_name;
  if(!(module_name in global)) global[module_name] = module;
});
