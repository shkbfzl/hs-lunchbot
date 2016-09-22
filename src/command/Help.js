/**
 *
 *
 */
require('rootpath')();

var _ = require('underscore');
var BaseCmd = require('src/command/Base');
var config = require('config/config.help.command.json');

module.exports = BaseCmd.extend({

    response: null,
    commandResponses: {},
    
    /**
     * Module to construct the response to the help command.
     */
    initialize: function() {
        this._super();
        this.commandResponses = this.buildCommandResponses(config.commands);
        this.response = this.buildResponse();
    },

    run: function(resolve, reject) {
        resolve(this.getResponse());
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
                attachment: {
                    text: this.createCommandResponse(cmd)
                }
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
    getResponse: function() {
        return this.response;
    },

    getCommandResponse: function(cmdName) {
        var response = _.findWhere(this.commandResponses, {'name': cmdName});

        if (!response) {
            throw new Error('Command cannot be found.');
        } else {
            return response.attachment;
        }
    },

    /**
     * Takes a command object and returns it's response format.
     * 
     * @param  {Object} cmd Command object, defined in config.
     * @return {String}     Response format.
     */
    createCommandResponse: function(cmd) {
        var response = _.template('> *<%= description %>* \n> <%= syntax %> \n> <%= examplesText %>');
        var examples = cmd.examples || [];
        var options = {};

        options.examplesText = this.createExamplesResponse(examples);

        return response(_.extend(cmd, options));
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
        var ex = (example) ? 'Example: `' + example + '`' : '';
        return ex;
    }
});

