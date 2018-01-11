var sinon = require('sinon');
var bluebird = require('bluebird');
var expect = require("chai").expect;

var app = require('../../app');

describe('User', function() {
  it('Deve inserir um novo cadastro', function(done) {
    var controller = require('./controller');

    var dao = {
      insert: function(object,cb){
        cb();
      }
    }

    controller.dao = bluebird.promisifyAll(dao);

    var nextSpy = sinon.spy();
    var insertAsyncSpy = sinon.spy(controller.dao, "insertAsync");

    controller.index({}, {}, nextSpy);

    expect(insertAsyncSpy.called).to.be.true;
    expect(nextSpy.called).to.be.false;

    done();
  });
});
