var Generator = require('yeoman-generator');
var utils = require('../utils');
var crypto = require('crypto');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        if(args[0]) this.project_name = args[0];
        if(args[1]) this.port = args[1];
        // this.someHelper = function(){
        //     console.log('this is my helper');
        // }
    }

    initializing(){

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
            answers = Object.assign(answers, _answers);

            var default_project_name = '';

            var questions = [];

            if(!this.project_name){
                var project_name_question = {
                    type    : 'input',
                    name    : 'project_name',
                    message : 'What\'s the name of the project?'
                };

                if(answers.new_folder) project_name_question.default = self.appname;
                questions.push(project_name_question);
            }

            if(!this.port){
                questions.push({
                    type    : 'input',
                    name    : 'port',
                    message : 'What port should the project listen to?'
                });
            }

            return this.prompt(questions);

        }).then(function(_answers){

            answers = Object.assign(answers, _answers);
            for(var answer in answers) self[answer] = answers[answer];
            self.slugified_project_name = utils.slugify(self.project_name);
            self.project_folder = answers.new_folder ? self.slugified_project_name : '';

        });
    }

    writing(){

        this.secret = crypto.createHash('md5').update((Date.now()+parseInt(Math.random() * 10000)).toString()).digest('base64');

        var destination_path = this.destinationPath(this.project_folder);
        var template_path = this.templatePath();
        // console.log('');console.log('');console.log('');console.log('');console.log('');console.log('');console.log('');console.log('');

        this.fs.copyTpl(
            this.templatePath('**/*'),
            destination_path,
            {
                project_name: this.project_name,
                slugified_project_name: this.slugified_project_name,
                port: this.port,
                secret: this.secret
            }
        );

        // hidden files
        this.fs.copy(
            this.templatePath('**/.*'),
            destination_path
        );
    }

    publicMethod(){
        console.log('publicMethod');
    }

    _privateMethod(){
        console.log('privateMethod');
    }
};
