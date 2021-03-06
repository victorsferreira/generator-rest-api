'use strict';
var yeoman  = require('yeoman-generator');
// var slugify = require('slugify');
var utils = require('../utils');

function ucwords(input){
  return input.replace(/\b\w/g, l => l.toUpperCase());
}

module.exports = yeoman.Base.extend({
  constructor: function(){
    yeoman.Base.apply(this, arguments);

    var local_options = {nc:'controller',nd:'dao',nm:'model',nr:'routes',nrm:'readme',nt:'test',nh:'helper'};

    for(var k in local_options){
      this.option(k);
      this.option(local_options[k]);

      this['no_'+local_options[k]] = this.options[k] ? true : (this.options[local_options[k]] ? this.options[local_options[k]] === 'false' : false);
    }

    this.argument('resource_name', { type: String, required: false });
  },
  welcome: function(){
    console.log('We are creating your new resource!');
  },
  prompting: function(){
    var questions = [];

    if(!this.resource_name){
      questions.push({
        type: 'input',
        name: 'resource_name',
        message: 'Qual será o nome do módulo?'
      });
    }

    return this.prompt(questions)
    .then(function (answers) {
      if('resource_name' in answers) this.resource_name = answers['resource_name'];
    }.bind(this));
  },
  writing: function(){
    this.resource_name_slugified = utils.slugify(this.resource_name);
    this.resource_class_name = utils.className(this.resource_name);

    var self = this, extension;

    ['controller','dao','model','routes','integration_test','unit_test','middlewares','readme','mock'].forEach(function(input){
      if(self['no_'+input]) return true;

      if(input == 'readme'){
        input = input.toUpperCase();
        extension = 'md';
      }else extension = 'js';

      self.fs.copyTpl(
        self.templatePath(input+'.'+extension),
        self.destinationPath('modules/'+self.resource_name_slugified+'/'+input+'.'+extension),
        {
          resource_class_name: self.resource_class_name,
          resource_name_slugified: self.resource_name_slugified,
          resource_name: self.resource_name
        }
      );
    });
  }
});
