/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var assert = require('chai').assert;
var log = require('log4js').getLogger('model/mongodb/User.spec');
var User  = require('src/model/mongodb/User.js');
var Promise = require('node-promise').Promise;
var All = require('node-promise').all;
var _ = require('underscore');
var Boot = require('src/app/Boot.js');
var pjson = require('src/util/pretty_json');
var UnkwnRestaurantError = require('src/error/UnknowRestaurantError.js');
var aw = require('async').waterfall;

describe('Users model', function(){

    var uID = "user1";

    beforeEach(function(done){
        Boot.ready(done);
    });

    describe('CRUD on User', function(){

        it('Delete user', function(done) {

            aw([
                function (cb) {
                log.debug("Deleting uid= ", uID);
                    User.deleteById(uID, cb);
                },
                function (result, cb) {
                    log.debug("Getting uid= ", uID);

                    User.getById(uID, cb);
                }
            ], function(err, data){
                log.info("Error= ", err, ", Data = ", data);
                assert.isTrue(!err);
                assert.isTrue(!data);
                done();
            });

        });

        it("Key doesn't exist", function(done) {

            User.keyExists(uID , function(bool) {
                log.info(" Bool = ", bool);
                assert.isTrue(!bool);
                done();
            });
        });

        it('Create user', function(done) {

            User.create(uID , "Mike", function(err, data) {
                log.info("Error= ", err, ", Data = ", data);
                assert.isTrue(!err);
                done();
            });
        });

        it("Key exist", function(done) {

            User.keyExists(uID , function(bool) {
                log.info(" Bool = ", bool);
                assert.isTrue(bool);
                done();
            });
        });

        it('Get user', function(done) {

            User.getById(uID, function(err, data) {

                log.info("Error= ", err, ", Data = ", data);
                assert.isTrue(data._id == uID);
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

        it('Create users', function(done) {
            var id100= "user100";
            var id200= "user200";
            var p1 = new Promise();
            var p2 = new Promise();

            User.create(id100, "Sun", function(){ p1.resolve() });
            User.create(id200, "Moon", function(){ p2.resolve() });

            All([p1,p2])
                .then(function(){
                    done();
                });

        });

        it('Get All users', function(done) {

            User.getAll(function(list){

                log.info("Users= ", list);
                var ulists = [];
                _.each(list, function(item) {
                    ulists.push(item._id);
                });

                _.contains(ulists, "user100");
                _.contains(ulists, "user200");
                done();
            });
        });

        //---------------- RESTAURANTS ----------------
        it('Add Golden sushi restaurant', function(done) {

            aw([
                function(cb){
                    User.addPlace(uID , "Golden Sushi", cb);
                },
                function(result, cb) {
                    User.getById(uID, cb);
                },
                function(data, cb) {
                    cb(null, data)
                }
            ], function(err, data){
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(_.keys(data.places).length == 1);
                done();
            });
        });

        it('Add Nice Burger restaurant', function(done) {

            aw([
                function(cb){
                    User.addPlace(uID , "Nice Burger", cb);
                },
                function(result, cb) {
                    User.getById(uID, cb);
                },
                function(data, cb) {
                    cb(null, data)
                }
            ],function (err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(_.keys(data.places).length == 2);
                done();
            });
        });

        it('Remove restaurant', function(done) {

            aw([
                function(cb){
                    User.removeByPlaceName(uID, "nice BuRger", cb);
                },
                function(result, cb) {
                    User.getById(uID, cb);
                },
                function(data, cb) {
                    cb(null, data)
                }
            ], function (err, data) {

                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(_.keys(data.places).length == 1);
                done();
            });
        });

        //---------------- BANNED LIST ----------------
        it('Add Lite mirror restaurant', function(done) {

            aw([
                function(cb){
                    User.addPlace(uID , "Lite  Mirror", cb);
                },
                function(result, cb) {
                    User.getById(uID, cb);
                },
                function(data, cb) {
                    cb(null, data)
                }
            ], function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(_.keys(data.places).length == 2);
                done();
            });
        });

        it("Ban wrong restaurant", function(done) {

            aw([
                function(cb){
                    User.addToBannedList(uID , "Gold sushi", cb);
                },
            ], function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(err instanceof UnkwnRestaurantError);
                done();
            });
        });

        it("Ban 'Gold sushi' restaurant", function(done) {

            aw([
                function(cb){
                    User.addToBannedList(uID , "GoLden sushi", cb);
                },
                function(result, cb) {
                    User.getById(uID, cb);
                },
                function(data, cb) {
                    cb(null, data)
                }
            ], function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(data.banned.length == 1);
                done();
            });

        });

        it("Ban 'Lite mirror ' restaurant", function(done) {

            aw([
                function(cb){
                    User.addToBannedList(uID , "Lite mirror ", cb);
                },
                function(result, cb) {
                    User.getById(uID, cb);
                },
                function(data, cb) {
                    cb(null, data)
                }
            ], function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(data.banned.length == 2);
                done();
            });
        });

        it("Remove 'GoLden sushi' restaurant", function(done) {

            aw([
                function(cb){
                    User.removeFromBannedList(uID , "GoLden sushi", cb);
                },
                function(result, cb) {
                    User.getById(uID, cb);
                },
                function(data, cb) {
                    cb(null, data)
                }
            ], function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(data.banned.length == 1);
                done();
            });
        });

    });
});
