var _ = require('underscore');

var config = require('./../config/config.help.command.json');


/**
 * Module to construct the response to the help command.
 */
function HelpCommand() {
	this.buildResponse();
}

/**
 * Constructs the response to the command.
 *
 * Response should be built when module is loaded so 
 * quick response can be sent to the user.
 */
HelpCommand.prototype.buildResponse = function() {
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
};

/**
 * Returns the response to send back to slack.
 * 
 * @return {String} Response text.
 */
HelpCommand.prototype.getResponse = function() {
	return this.response;
};

/**
 * Takes a command object and returns it's response format.
 * 
 * @param  {Object} cmd Command object, defined in config.
 * @return {String}     Response format.
 */
HelpCommand.prototype.createCommandResponse = function(cmd) {
	var response = _.template('>>> *<%= description %>* \n <%= syntax %>');

	return response(cmd);
};

module.exports = HelpCommand;