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
     * Returns the initial help response when a user
     * creates a profile with lunchio.
     *
     * Requires a username to address the user directly.
     * 
     * @param  {String} username Slack username.
     * @return {String}          Signup response.
     */
    getSignupResponse: function(username) {
        if (!username) {
            throw new Error('Username must be provided.');
        }

        var response = _.template("Hi @<%= username %>, my name is luncio. I can help you and your friends \
        find the place for lunch that everyone will enjoy. Get started by adding your favorite \
        restaurants to your profile using: \n*<%= addCmd %>* \nYou can also \
        tell me the restaurants you don't like so I can start to learn more about your food \
        preferences and only recommend the places you'll enjoy most. I call these your banned \
        restaurants. Add restaurants to your banned list using: \n*<%= banCmd %>* \n\
        If you ever want to see what restaurants you've favorited and what you've banned just \
        ask using: \n*<%= myListCmd %>* \nWhen it's time to go to lunch I can help you \
        invite your friends using: \n*<%= inviteCmd %>* \nQuestions? Just type *<%= helpCmd %>* in \
        the message bar and see a list of everything I can do. \nHappy lunching!");
        var data = {
            username: username,
            addCmd: this.getCommandResponse('add place'),
            banCmd: this.getCommandResponse('ban'),
            myListCmd: this.getCommandResponse("what's on my list"),
            inviteCmd: this.getCommandResponse('invite'),
            helpCmd: '/lunchio'
        };

        return {
            "text": response(data)
        };
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
     * @param  {Array} examples Array of example Strings.
     * @return {String}          Concatenation of all examples, with markup.
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

