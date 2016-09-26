/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var assert = require('chai').assert;
var log = require('log4js').getLogger('model/dynamodb/User.spec');
var User  = require('src/model/dynamodb/User.js');
var Client = require('src/model/dynamodb/Client.js');
var Promise = require('node-promise').Promise;
var All = require('node-promise').all;

describe('Users model', function(){

    var uID = "user100";

    describe('Add/Update/Delete User', function(){

        it('Delete user', function(done) {

            User.deleteById(uID , function(err, data) {
                log.info("Error= ", err, ", Data = ", data);
                assert.isTrue(!err);
                done();
            });
        });

        it('Create user', function(done) {

            User.setName(uID , "Mike", function(err, data) {
                log.info("Error= ", err, ", Data = ", data);
                assert.isTrue(!err);
                done();
            });
        });

        it('Get user', function(done) {

            User.getById(uID, function(err, data) {
                log.info("Error= ", err, ", Data = ", data);
                assert.isTrue(data.Id == uID);
                done();
            });
        });

        it('Delete All users', function(done) {

            var id100= "user100";
            var id200= "user200";
            var p1 = new Promise();
            var p2 = new Promise();

            User.deleteById(id100, function(){ p1.resolve() });
            User.deleteById(id200, function(){ p2.resolve() });

            All([p1,p2])
                .then(function(){
                    done();
                });

        });

        it('Add users', function(done) {
            var id100= "user100";
            var id200= "user200";
            var p1 = new Promise();
            var p2 = new Promise();

            User.setName(id100, "Sun", function(){ p1.resolve() });
            User.setName(id200, "Moon", function(){ p2.resolve() });

            All([p1,p2])
                .then(function(){
                    done();
                });

        });

        it('Get All users', function(done) {

            User.getAll(function(err, lists){

                log.info("Users= ", lists);
                assert.isTrue(lists.length == 3);
                done();
            });
        });

    });

    describe('Add/Update/Delete User restaurants', function(done){

    });

});
