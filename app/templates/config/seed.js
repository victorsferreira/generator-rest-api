require('./helpers');
var fs = require('fs');
var config = require('./');
var db = require('./db');

var connection = db.connect(config.db);

var seeded_modules, seed;
var path = Helper.rootPath()+'seed';

if(fs.existsSync(path)){
  seeded_modules = fs.readFileSync(path, "utf8");
  seeded_modules = JSON.parse(seeded_modules);
}else{
  seeded_modules = [];
}

if(process.argv[2] && process.argv[2] == 'force') seeded_modules = [];

Helper.forEachModuleFileType('seed',function(entry,file_name){
  if(seeded_modules.indexOf(entry) == -1){
    seed = require(file_name);
    Helper.moduleFile(entry,'model',function(model){
      if(model){
        console.log('Seeding '+entry);

        if(!Array.isArray(seed) && typeof seed === 'object') seed = [seed];

        seed.forEach(function(data){
          console.log('Data: ', data);
          model.create(data);
        });

        seeded_modules.push(entry);
      }
    });
  }
});

fs.writeFile(path, JSON.stringify(seeded_modules));

connection.close(function(){
  console.log('Seed completed');
});
