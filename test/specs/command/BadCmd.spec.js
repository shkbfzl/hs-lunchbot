/**
 * Hello command test file
 */

require('rootpath')();

var assert = require('chai').assert;
var BaseCmd = require('src/command/Base.js');
var log = require('log4js').getLogger("BadCmd.spec");
var CmdError = require('src/error/CommandError.js');


/**
 * @class UnhandledErrorCmd
 */
var UnhandledErrorCmd = BaseCmd.extend({

    run: function(resolve, reject) {
        throw new CmdError("Don't run me!!");
    }
});

/**
 * @class RejectCmd
 */
var RejectCmd = BaseCmd.extend({

    run: function(resolve, reject) {

        reject("I'm not happy!!");
    }
});



describe("BadCmd.spec", function (){

    it("UnhandledErrorCmd: should fail ", function() {

        var cmd  = new UnhandledErrorCmd();
        cmd.handle()
            .then(null, function(error){

                assert.isTrue(e instanceof CmdError);
            });

    });

    it("RejectCmd: should reject promise ", function() {

        var cmd  = new UnhandledErrorCmd();
        cmd.handle()
            .then(null, function(error){

            assert.isTrue(false);
            assert.isTrue("I'm not happy!!");
        });


    });


})