/**
 * Hello command test file
 */

require('rootpath')();

var assert = require('chai').assert;
var User = require('src/model/mongodb/User.js');
var log = require('log4js').getLogger("AddRestaurant.spec");
var AddPlaceCmd = require('src/command/AddRestaurant.js');
var Boot = require('src/app/Boot');
var aw = require('async').waterfall;
var _ = require('underscore');


var cmd ,
    userId = 'U284347',
    userName = 'Mr burna'
    ;

describe("AddRestaurant.spec", function (){

    beforeEach(function(done){

        Boot.ready(done);
    });

    it("Add without restaurant name", function(done) {
        cmd = new AddPlaceCmd();
        cmd.options.user_id = userId;

        cmd.onDone(function(err, resp){

            assert.isFalse(!err);
            assert.isTrue(!resp);
            done();
        });
        cmd.run();
    });

    it('Add new restaurant', function(done){

        cmd = new AddPlaceCmd();
        cmd.options.user_id = userId;
        cmd.options.place = "Monicas from Boston";
        aw([
            function(cb){
                User.collection().save({ _id: userId }, cb);
            },
            function(resp, cb) {

                cmd.onDone(cb);
                cmd.run();
            },
            function(resp, cb) {
                log.info("Response =", resp);

                assert.isTrue(resp.text.toLowerCase().indexOf("choice") >= 0);
                User.getById(userId, cb);
            }

        ], function(err, data){
            log.info("Error =",err, ", data=", data);

            assert.isTrue(!err);

            var places = _.values(data.places);
            assert.isTrue(places[0] == "monicas from boston");
            done();
        });
    });

})