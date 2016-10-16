/**
 *
 *
 */
require('rootpath')();


var assert = require('chai').assert;
var log = require('log4js').getLogger('Auth.spec');
var UserModel = require('src/model/mongodb/User.js');
var aw = require('async').waterfall;
var Boot = require('src/app/Boot');
var Auth = require('src/core/Auth.js');

describe('Auth', function(){

    beforeEach(function(done){
        Boot.ready(done);
    });

    var uID = 'U99201';

    it("Unknow user", function(done) {

        UserModel.deleteById(uID, function(){

            Auth.checkUser(uID, function(noUser){

                assert.isTrue(noUser != null);
                done();
            })
        });
    });

    it("Existing user", function(done) {

        aw([
            function(cb){
                UserModel.create(uID, 'sam', cb);
            },
            function(resp, cb) {

                Auth.checkUser(uID, cb);
            }
        ], function(err, data) {
            log.debug("Error= ", err," data=",data);
            assert.isTrue(!err);
            assert.isTrue(data != null);
            done();
        });
    })

})

