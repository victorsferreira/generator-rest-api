var request = require('supertest');

var app = require('../../app');

describe('GET /user', function() {
  it('respond with json', function(done) {
    request(app)
    .get('/user')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});
