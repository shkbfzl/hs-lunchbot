/**
 *
 *
 */
require('rootpath')();

var _ = require('underscore');
var BaseCmd = require('src/command/Base');
var config = require('config/config.help.command.json');

module.exports = BaseCmd.extend({
    
    /**
     * Module to construct the response to the help command.
     */
    initialize: function() {
        this._super();
        this.buildResponse();
    },

    run: function(resolve, reject) {
        resolve(this.getResponse());
    },

    /**
     * Constructs the response to the command.
     *
     * Response should be built when module is loaded so 
     * quick response can be sent to the user.
     */
    buildResponse: function() {
        var response = {};
        var cmdsLen = config.commands.length;

        response.text = 'Lunch.io is a tool that can help your team choose a lunch destination faster.';
        response.attachments = [];

        for (var i = 0; i < cmdsLen;i++) {
            var cmd = config.commands[i];
            var attachment = {};

            attachment.text = this.createCommandResponse(cmd);

            response.attachments.push(attachment);
        }

        this.response = response;
    },

    /**
     * Returns the response to send back to slack.
     * 
     * @return {String} Response text.
     */
    getResponse: function() {
        return this.response;
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

