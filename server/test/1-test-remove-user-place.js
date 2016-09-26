'use strict';

var assert = require('chai').assert;
var removeUserPlace = require("../lib/remove-user-place");
var testData = require("./util/test-data");

var userId = testData.testUser1.Name;
var userPlace = "Cosi";

describe('Testing Remove User Place', function() {
  it('Successfully removes a user place', function(done) {
    removeUserPlace.removeUserPlace(userId, userPlace, function(err, data) {
        assert.isOk(data);
        done();
    });
  });
  it('Handles trying to removes a user place that is missing', function(done) {
    removeUserPlace.removeUserPlace(userId, userPlace, function(err, data) {
        assert.isOk(err);
        done();
    });
  });
});
