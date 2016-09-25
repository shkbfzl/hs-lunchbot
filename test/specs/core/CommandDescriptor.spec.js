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
var _ = require('underscore');

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

    describe('Create command with parsers', function() {

        var cmdDr = new CommandDescriptor();
        cmdDr.mappedCommandName = "Hello";
        cmdDr.parsers = ['UserName'];

        it('Empty text', function(){
            cmdDr.inputText = null;
            var cmd = cmdDr.createCommand({name: 'me'});
            log.debug("Hhhhhhh "+cmd.options.users);
            assert.isTrue(cmd.options.users.length == 0);
            assert.isTrue(cmd.options.name == 'me');
        })

        cmdDr.inputText = "Hi  @mike, @judi are you hungry";
        cmd = cmdDr.createCommand();

        it('Users size == 2', function(){
            assert.isTrue(cmd.options.users.length == 2);
        })

        it('Users one == @mike', function(){
            assert.isTrue(cmd.options.users[0] == '@mike');
        });

        it('Users two == @judi', function(){
            assert.isTrue(cmd.options.users[1] == '@judi');
        });

    })

})

