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

    run: function() {
        throw new CmdError("Don't run me!!");
    }
});

/**
 * @class RejectCmd
 */
var RejectCmd = BaseCmd.extend({

    run: function() {

        this.response.send("I'm not happy!!");
    }
});



describe("BadCmd.spec", function (){

    it("UnhandledErrorCmd: should fail ", function() {

        var cmd  = new UnhandledErrorCmd();
        try{
            cmd.run();
        }
        catch (e) {
            assert.isTrue(e instanceof CmdError);
        }
    });

    it("RejectCmd: should triggger promise ", function(done) {

        var cmd  = new RejectCmd();
        cmd.run();
        cmd.onDone(function(err, data){

            assert.isTrue(!err);
            assert.isTrue(data.text == "I'm not happy!!");
            done();
        });

    });


})