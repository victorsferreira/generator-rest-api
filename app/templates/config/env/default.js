var config = {
  port: <%= port %>,
  db: {
    username: '',
    password: '',
    host:'localhost',
    port: 27017,
    database: '<%= slugified_project_name %>',
    uri: 'mongodb://localhost:27017/<%= slugified_project_name %>'
  }
};

module.exports = config;
