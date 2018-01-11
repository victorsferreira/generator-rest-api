var request = require('supertest');
var mocha = require('mocha');

var app = require('../../app');

describe('GET /<%= resource_name_slugified %>', function() {
  it('respond with json', function(done) {
    request(app)
    .get('/<%= resource_name_slugified %>')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});
