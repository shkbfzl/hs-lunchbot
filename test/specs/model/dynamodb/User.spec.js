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
var _ = require('underscore');
var pjson = require('src/util/pretty_json');
var UnkwnRestaurantError = require('src/error/UnknowRestaurantError.js');

describe('Users model', function(){

    var uID = "user1";

    describe('CRUD on User', function(){

        it('Delete user', function(done) {

            User.deleteById(uID , function(err, data) {
                log.info("Error= ", err, ", Data = ", data);
                assert.isTrue(!err);
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

                data = User.normalizeItem(data.Item);

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

            User.getAll(function(err, list){

                log.info("Users= ", list);
                var ulists = [];
                _.each(list, function(item) {
                    ulists.push(item.Id);
                });

                _.contains(ulists, "user100");
                _.contains(ulists, "user200");
                done();
            });
        });

        //---------------- RESTAURANTS ----------------
        it('Add Golden sushi restaurant', function(done) {

            User.addPlace(uID , "Golden Sushi", function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(_.keys(data.Attributes.Places.M).length == 1);
                done();
            });
        });

        it('Add Nice Burger restaurant', function(done) {

            User.addPlace(uID , "Nice Burger", function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(_.keys(data.Attributes.Places.M).length == 2);
                done();
            });
        });

        it('Remove restaurant', function(done) {

            User.removeByPlaceName(uID , "nice BuRger", function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(_.keys(data.Attributes.Places.M).length == 1);
                done();
            });
        });

        //---------------- BANNED LIST ----------------
        it('Add Lite mirror restaurant', function(done) {

            User.addPlace(uID , "Lite  Mirror", function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(_.keys(data.Attributes.Places.M).length == 2);
                done();
            });
        });

        it("Ban wrong restaurant", function(done) {

            User.addToBannedList(uID , "Gold sushi", function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(err instanceof UnkwnRestaurantError);
                done();
            });
        });

        it("Ban 'Gold sushi' restaurant", function(done) {

            User.addToBannedList(uID , "GoLden sushi", function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(data.Attributes.Banned.SS.length == 1);
                done();
            });
        });

        it("Ban 'Lite mirror ' restaurant", function(done) {

            User.addToBannedList(uID , "Lite mirror ", function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(data.Attributes.Banned.SS.length == 2);
                done();
            });
        });

        it("Remove 'GoLden sushi' restaurant", function(done) {

            User.removeFromBannedList(uID , "GoLden sushi", function(err, data) {
                log.info("Error= ", err, ", Data = ", pjson(data));
                assert.isTrue(!err);
                assert.isTrue(data.Attributes.Banned.SS.length == 1);
                done();
            });
        });

    });
});
