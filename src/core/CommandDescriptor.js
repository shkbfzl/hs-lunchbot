/**
 * Created by mohamed.kante on 9/20/16.
 */

require('rootpath')();

var Class = require('backbone-class');
var log = require('log4js').getLogger(__filename);
var MissingCmdError = require("src/error/MissingCommandError.js");
var BaseCommand = require('src/command/Base.js');

var cmdDir = 'src/command';

module.exports = Class.extend({

    dialectMatch: null,
    mappedCommandName: null,
    inputText: null,

    createCommand: function(options) {
        var command,
            cmdPath,
            CmdClass
            ;

        cmdPath = cmdDir+"/"+this.mappedCommandName+".js";

        try{
            log.info("Loading commad module= "+cmdPath);
            CmdClass = require(cmdPath);
        }
        catch(e) {
            log.error(e);
            throw new MissingCmdError(e);
        }

        /*
         * Pass command options if needed
         */
        command = new CmdClass(options);
        command.setDescriptor(this);

        if (!(command instanceof BaseCommand)) {
            throw new CommandError("Invalid command "+descriptor);
        }

        return command;
    }
});
