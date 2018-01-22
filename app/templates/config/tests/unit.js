const Core = require('../core');

Core.forEachModuleFilePattern('(unit_test|tests/(.*)unit_test|tests/unit/*)$',function(entry,path){
  require(path);
});
