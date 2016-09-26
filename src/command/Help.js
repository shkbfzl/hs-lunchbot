/**
 *
 *
 */
require('rootpath')();

var _ = require('underscore');
var BaseCmd = require('src/command/Base.js');
var log = require('log4js').getLogger(__filename);
var config = require('config/config.help.command.json');

module.exports = BaseCmd.extend({

    helpOutput: null,
    commandResponses: {},
    
    /**
     * Module to construct the response to the help command.
     */
    initialize: function() {
        this._super();
        this.commandResponses = this.buildCommandResponses(config.commands);
        this.helpOutput = this.buildResponse();
    },

    run: function() {
        log.debug(this.helpOutput);

        var text = this.helpOutput.text ;
        var self = this;

        _.each(this.helpOutput.attachments, function(attmnt){
            self.response.addAttachment(attmnt);
        });

        this.response.send(text);
    },

    /**
     * Constructs the response to the command.
     *
     * Response should be built when module is loaded so 
     * quick response can be sent to the user.
     *
     * @return {Object} Describes aspects of a slack response.
     */
    buildResponse: function() {
        var response = {};

        response.text = 'Lunch.io is a tool that can help your team choose a lunch destination faster.';
        response.attachments = [];

        _.each(this.commandResponses, function(cmdResponse) {
            response.attachments.push(cmdResponse.attachment);
        });

        return response;
    },

    /**
     * Builds all responses for all commands.
     * 
     * @param  {Array} commands List of command config objects.
     * @return {Array}          List of command response objects.
     */
    buildCommandResponses: function(commands) {
        var responses = [];
        var cmdsLen = commands.length;

        for (var i = 0; i < cmdsLen;i++) {
            var cmd = commands[i];
            var response = {
                name: cmd.name,
                attachment: this.createCommandResponseObject(cmd)
            };

            responses.push(response);
        }

        return responses;
    },

    /**
     * Returns the response to send back to slack.
     * 
     * @return {String} Response text.
     */
    getOutput: function() {
        return this.helpOutput;
    },

    /**
     * Retrieves the help response for a specific command.
     *
     * Throws an error if given command cannot be found.
     * 
     * @param  {String} cmdName Name of a command
     * @return {}         [description]
     */
    getCommandResponse: function(cmdName) {
        var cmdResponse = _.findWhere(this.commandResponses, {'name': cmdName});
        var template = _.template("*<%= description %>* \n<%= syntaxAndExamples %>");
        var response = {};

        if (!cmdResponse) {
            throw new Error('Command cannot be found.');
        } else {
            response.text = template({
                description: cmdResponse.attachment.title, 
                syntaxAndExamples: cmdResponse.attachment.text
            });
            return response;
        }
    },

    /**
     * Takes a command object and returns it's response format.
     * 
     * @param  {Object} cmd Command object, defined in config.
     * @return {String}     Response format.
     */
    createCommandResponseObject: function(cmd) {
        var response = {
            "title": cmd.description,
            "mrkdwn_in": ["text"]
        };
        var template = _.template('<%= syntax %> \n<%= examplesText %>');
        var examples = cmd.examples || [];
        var options = {};

        options.examplesText = this.createExamplesResponse(examples);
        response.text = template(_.extend(cmd, options));

        return response;
    },

    /**
     * Returns reponse of all examples
     * @param  {[type]} examples [description]
     * @return {[type]}          [description]
     */
    createExamplesResponse: function(examples) {
        var self = this;
        var response = '';

        _.each(examples, function(ex) {
            response += self.addExampleResponse(ex) + '\n';
        });

        return response;
    },

    /**
     * Returns the example with markup.
     * 
     * @param  {Object} example Example text.
     * @return {String}         Example text with markup.
     */
    addExampleResponse: function(example) {
        var template = _.template("Example: `<%= example %>`");
        return (example) ? template({example:example}) : "";
    }
});

