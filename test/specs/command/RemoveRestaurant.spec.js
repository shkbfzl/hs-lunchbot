/**
 * Hello command test file
 */

require('rootpath')();

var assert = require('chai').assert;
var User = require('src/model/mongodb/User.js');
var log = require('log4js').getLogger("RemoveRestaurant.spec");
var Command = require('src/command/RemoveRestaurant.js');
var Boot = require('src/app/Boot');
var aw = require('async').waterfall;
var _ = require('underscore');


var cmd ,
    userId = 'U2299'
    ;

describe("RemoveRestaurant.spec", function (){

    beforeEach(function(done){

        Boot.ready(done);
    });

    it('Add new restaurant', function(done){

        cmd = new Command();
        cmd.options.user_id = userId;
        cmd.options.place = "Silver  sushi ";
        aw([
            function(cb){
                User.collection()
                    .save({
                        _id: userId,
                        places: {
                            'p1': 'golden sushi',
                            'p2': 'silver sushi',
                        }
                    }, cb);
            },
            function(resp, cb) {

                cmd.onDone(cb);
                cmd.run();
            },
            function(resp, cb) {
                log.info("Response =", resp);

                assert.isTrue(resp.text.toLowerCase().indexOf("problem") >= 0);
                User.getById(userId, cb);
            }

        ], function(err, data){
            log.info("Error =",err, ", data=", data);

            assert.isTrue(!err);

            var places = _.values(data.places);
            assert.isTrue(places.length == 1);
            assert.isTrue(places[0] == "golden sushi");
            done();
        });
    });

})