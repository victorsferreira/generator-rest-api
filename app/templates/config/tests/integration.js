const Core = require('../core');

Core.forEachModuleFilePattern('(integration_test|tests/(.*)integration_test|tests/integration/*)$',function(entry,path){
  require(path);
});
