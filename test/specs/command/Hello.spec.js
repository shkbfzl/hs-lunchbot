/**
 * Hello command test file
 */

require('rootpath')();

var assert = require('chai').assert;
var HelloCmd = require('src/command/Hello.js');
var BaseCmd = require('src/command/Base.js');
var log = require('log4js').getLogger("Hello.spec");

describe("command/Hello", function (){

    it("Check inheritance", function() {

        var cmd  = new HelloCmd();
        assert.isTrue(cmd instanceof HelloCmd);
        assert.isTrue(cmd instanceof BaseCmd);
    });

    it("Test run", function() {

        var cmd  = new HelloCmd();

        cmd.run(function(result) {

            assert.isTrue(result == "Hello, are you hungry?");
        });

    });

    it("Test attributes", function() {

        var cmd  = new HelloCmd({
            lang: 'fr',
            name: 'mickey'
        });
        log.info ("class options = ",cmd.options);

        cmd.run(function(result) {

            assert.isTrue(cmd.name == 'hello');
            assert.isTrue(cmd.options.name == 'mickey'); // You can't override name
            assert.isTrue(cmd.options.lang == 'fr');
            assert.isTrue(cmd.options.badAttribute == undefined);
        })
    });

})