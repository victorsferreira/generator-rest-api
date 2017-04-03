var Generator = require('yeoman-generator');
var utils = require('../utils');
var crypto = require('crypto');
var fs = require('fs');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    initializing(){
        var destination_path = this.destinationPath();
        var template_path = this.templatePath();

        var meta_json = JSON.parse(fs.readFileSync(destination_path+'/meta.json','utf-8'));
        var current_version = meta_json['current-version'];
        var automatic = parseInt(current_version) + 1;
        meta_json['current-version'] = automatic;

        // console.log()

        process.exit();
    }

    prompting(){
        var self = this;

        var answers = {};
        return this.prompt([
            {
                type    : 'confirm',
                name    : 'new_folder',
                message : 'Should we create a new folder for this project?',
                default: false
            }
        ]).then((_answers) => {

        }).then(function(_answers){

        });
    }

    writing(){
        var destination_path = this.destinationPath(this.project_folder);
        var template_path = this.templatePath();
    }
};
