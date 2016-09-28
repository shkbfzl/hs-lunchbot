/**
 * MyList command test file
 */

require('rootpath')();

var assert = require('chai').assert;
var MyListCmd = require('src/command/MyList.js');
var BaseCmd = require('src/command/Base.js');
var log = require('log4js').getLogger("MyList.spec");

var uID = "user1";
var specText = "Lunch.io is a tool that can" +
               " help your team choose a lunch " +
               "destination faster."

describe("command/MyList", function () {

    it("Check inheritance", function() {

        var cmd  = new MyListCmd();
        assert.isTrue(cmd instanceof MyListCmd);
        assert.isTrue(cmd instanceof BaseCmd);
    });

    it("Test run with good user", function() {

        var cmd = new MyListCmd({
        	user_id: uID
        });
        log.info ("class options = ",cmd.options);
        cmd.run();
        cmd.onDone(function(error, result) {
            log.info('foo');
            assert.isTrue(result == specText);
        })

    });

})