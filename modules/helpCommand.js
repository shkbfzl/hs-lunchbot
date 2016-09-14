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
	var response = 'Lunch.io is a tool that can help your team choose a lunch destination faster.\n';

	for (var cmd in config.commands) {
		response += this.createCommandResponse(cmd);
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
	return cmd.name + '\n';
};

module.exports = new HelpCommand();