require('../helpers');

Helper.forEachModuleFilePattern('(unit_test|tests/(.*)unit_test|tests/unit/*)$',function(entry,path){
  require(path);
});
