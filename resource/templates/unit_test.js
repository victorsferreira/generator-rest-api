var sinon = require('sinon');
var expect = require("chai").expect;

var app = require('../../app');

describe('<%= resource_class_name %>', function() {
  it('Index', function(done) {
    var controller = require('./controller');

    var json = function(){};

    var status = function(){
      return res;
    };

    var res = {
      json: json,
      status: status
    };

    var nextSpy = sinon.spy();
    var jsonSpy = sinon.spy(res, "json");

    controller.index({}, res, nextSpy);

    expect(jsonSpy.called).to.be.true;
    expect(nextSpy.called).to.be.false;

    done();
  });
});
