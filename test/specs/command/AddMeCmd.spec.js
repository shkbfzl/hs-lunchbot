/**
 * Hello command test file
 */

require('rootpath')();

var assert = require('chai').assert;
var User = require('src/model/mongodb/User.js');
var log = require('log4js').getLogger("AddMeCmd.spec");
var AddMeCmd = require('src/command/AddMe.js');
var Boot = require('src/app/Boot');
var aw = require('async').waterfall;


var cmd ,
    userId = 'U222',
    userName = 'Mr burna'
    ;

describe("AddMeCmd.spec", function (){

    beforeEach(function(done){

        Boot.ready(done);
    });

    it("Add new user without name", function(done) {
        cmd = new AddMeCmd();
        cmd.options.user_id = userId;

        cmd.onDone(function(err, resp){

            assert.isFalse(!err);
            assert.isTrue(!resp);
            done();
        });
        cmd.run();
    });

    it('Add new user', function(done){

        cmd = new AddMeCmd();
        cmd.options.user_id = userId;
        cmd.options.user_name = "mike";
        aw([
            function(cb){
                User.deleteById(userId, cb);
            },
            function(resp, cb) {

                cmd.onDone(cb);
                cmd.run();
            }
        ], function(err, data){
            log.info("Error =",err, ", data=", data);
            assert.isTrue(!err);
            assert.isTrue(data.text.indexOf('mike') > 0);
            done();
        });
    });

    it('Add existing user', function(done){

        cmd = new AddMeCmd();
        cmd.options.user_id = userId;
        cmd.options.user_name = "mike";

        cmd.onDone(function(err, data){

            log.info("Error =",err, ", data=", data);

            assert.isTrue(!err);
            assert.isTrue(data.text.indexOf('creepy') > 0) ;
            done();
        });
        cmd.run();
    });

})