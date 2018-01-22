var request = require('supertest');
var expect = require("chai").expect;
var mongoose = require('mongoose');

var app = require('../../app');

describe('GET /user', function() {
  var fixtures = {
      user_test: {
        created_at: null
      }
  };

  it('Should respond all users', function(done) {
    request(app)
    .get('/user')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res)=>{
      expect(res.body).to.be.an.instanceof(Array);
      done();
    })
    .catch((err)=>{
      console.log('err', err);
    })
  });

    it('Should create a new user', function(done) {
      var created_at = Date.now();
      fixtures.user_test.created_at = created_at;

      request(app)
      .post('/user')
      .send({created_at: created_at})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res)=>{
        fixtures.user_test._id = res.body._id;
        expect(res.body).to.include.all.keys('created_at', '_id');
        done();
      })
      .catch((err)=>{
        console.log('err', err);
      })
    });

      it('Should display the created user', function(done) {
        request(app)
        .get('/user/'+fixtures.user_test._id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res)=>{
          expect(res.body).to.include.all.keys('created_at', '_id');
          expect(res.body._id).to.be.equal(fixtures.user_test._id);
          done();
        })
        .catch((err)=>{
          console.log('err', err);
        })
      });

        it('Should respond with HTTP 404 for non-existing user', function(done) {
          var _id = mongoose.Types.ObjectId();
          request(app)
          .get('/user/'+_id)
          .set('Accept', 'application/json')
          .expect(404)
          .end((req,res)=>{done()})
        });

          it('Should edit user', function(done) {
            var created_at = Date.now();

            request(app)
            .put('/user/'+fixtures.user_test._id)
            .send({created_at: created_at})
            .expect(200)
            .then((res)=>{
              done();
            })
            .catch((err)=>{
              console.log('err', err);
            })
          });

            it('Should remove user', function(done) {
              request(app)
              .delete('/user/'+fixtures.user_test._id)
              .expect(200)
              .then((res)=>{
                console.log('>>>> res', res)
                // expect(res.body).to.have.all.keys('created_at', '_id');
                // expect(res.body.created_at).to.be.equal(created_at);
                done();
              })
              .catch((err)=>{
                console.log('err', err);
                done();
              })
            });
});
