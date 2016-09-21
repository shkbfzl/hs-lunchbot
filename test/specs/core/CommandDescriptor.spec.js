/**
 *
 *
 */
require('rootpath')();


var assert = require('chai').assert;
var Config = require('config');
var log = require('log4js').getLogger('CommandDescriptor.spec');
var CommandDescriptor = require('src/core/CommandDescriptor');
var MissingCmdError = require("src/error/MissingCommandError.js");

describe('CommandDescriptor', function(){

    it('Test null with mappedCommandName', function() {

        try{
            var cmdDr = new CommandDescriptor();
            cmdDr.createCommand();
            assert.isTrue(false);
        }
        catch(e) {
            assert.isTrue(e instanceof MissingCmdError);
        }
    });

    it('Test missing command module', function() {

        try{
            var cmdDr = new CommandDescriptor();
            cmdDr.mappedCommandName = "BadBot";
            cmdDr.createCommand();
            assert.isTrue(false);
        }
        catch(e) {
            assert.isTrue(e instanceof MissingCmdError);
        }
    });

    it('Test with hello commad', function() {

        var cmdDr = new CommandDescriptor();
        cmdDr.mappedCommandName = "Hello";
        var cmd = cmdDr.createCommand();
        assert.isTrue(true);

        assert.isTrue(cmd.getDescriptor() === cmdDr );
    })

})

