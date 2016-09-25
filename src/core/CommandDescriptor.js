/**
 * Created by mohamed.kante on 9/20/16.
 */

require('rootpath')();

var Class = require('backbone-class');
var log = require('log4js').getLogger(__filename);
var MissingCmdError = require("src/error/MissingCommandError.js");
var BaseCommand = require('src/command/Base.js');
var BaseCmdParser = require('src/command/parser/BaseParser.js');
var InvalidCmdPrsrError = require('src/error/InvalidCommandParserError.js');
var _ = require('underscore');

var cmdDir = 'src/command';

module.exports = Class.extend({

    dialectMatch: null,
    mappedCommandName: null,
    inputText: null,
    parsers:[],

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

        var parsersOps = this.parseInput(this.inputText);
        var options = _.defaults(parsersOps, options);
        log.info("Merged options = ", options);

        /*
         * Pass command options if needed
         */
        command = new CmdClass(options);
        command.setDescriptor(this);

        if (!(command instanceof BaseCommand)) {
            throw new CommandError("Invalid command "+descriptor);
        }

        return command;
    },

    parseInput: function(text) {

        log.info("Run text through parsers= ", this.parsers);
        var ops = {};

        _.each(this.parsers, function(parserName) {

            var obj = null;
            try{
                var parserPath = 'src/command/parser/'+parserName+".js";
                log.debug("Parser: "+parserName+", path= "+parserPath);

                var ParserClass= new require(parserPath);

                obj = new ParserClass();

                if (!(obj instanceof BaseCmdParser)) {
                    throw new InvalidCmdPrsrError(parserName);
                }

            }
            catch(e) {
                log.warn(e);
                return;
            }

            ops[obj.keyName] = obj.parse(text);

        });

        log.debug("Parsers' options= ", ops);

        return ops;
    }
});
