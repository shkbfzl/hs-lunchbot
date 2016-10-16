/**
 * Hello command test file
 */

require('rootpath')();

var assert = require('chai').assert;
var User = require('src/model/mongodb/User.js');
var log = require('log4js').getLogger("RemoveBan.spec");
var Command = require('src/command/RemoveBan.js');
var Boot = require('src/app/Boot');
var aw = require('async').waterfall;
var _ = require('underscore');


var cmd ,
    userId = 'U8372'
    ;

describe("RemoveBan.spec", function (){

    beforeEach(function(done){

        Boot.ready(done);
    });

    it("Ban invalid restaurant", function(done) {
        cmd = new Command();
        cmd.options.user_id = userId;

        aw([
            function(cb) {
                User.collection()
                    .save({
                        _id: userId,
                        name: 'Mr bean'
                    }, cb);
            },
            function(resp, cb){

                cmd.onDone(cb);
                cmd.run();
            }
        ], function(err, resp) {
            log.info("Error =",err, ", data=", resp);

            assert.isTrue(err.indexOf("you don't have") > 0);
            done();
        })

    });

    it('Add new restaurant', function(done){

        cmd = new Command();
        cmd.options.user_id = userId;
        cmd.options.place = "Italian Fish";
        aw([
            function(cb){
                User.collection()
                    .save({
                        _id: userId,
                        places: {
                            'p1': 'foofoo',
                            'p2': 'italian fish',
                            'p3': 'american beef',
                        },
                        banned:[ 'p2', 'p3']
                    }, cb);
            },
            function(resp, cb) {

                cmd.onDone(cb);
                cmd.run();
            },
            function(resp, cb) {
                log.info("Response =", resp);

                assert.isTrue(resp.text != null);
                User.getById(userId, cb);
            }

        ], function(err, data){
            log.info("Error =",err, ", data=", data);

            assert.isTrue(!err);

            var places = _.values(data.places);
            var bannedList = _.values(data.banned);

            assert.isTrue(places.length == 3);
            assert.isTrue(bannedList.length == 1);
            assert.isTrue(bannedList[0] == "p3");
            done();
        });
    });

})