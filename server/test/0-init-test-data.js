'use strict';

var assert = require('chai').assert;
var createUser = require("../lib/create-user-record");
var testData = require("./util/test-data");

var userData = testData.testUser1;

describe('Loading Test User', function() {
  it('Successfully creates the test user', function(done) {
    createUser.createUserRecord(userData, function(err, data) {
        assert.isOk(data);
        done();
    });
  });
});
