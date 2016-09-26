'use strict';

var assert = require('chai').assert;
var deleteUser = require("../lib/delete-user-record");
var testData = require("./util/test-data");

var userId = testData.testUser1.Name;

describe('Deleting Test User', function() {
  it('Successfully deletes the test user', function(done) {
    deleteUser.deleteUserRecord(userId, function(err, data) {
        assert.isOk(data);
        done();
    });
  });
});
