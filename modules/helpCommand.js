var HelpCommand = function(){
	this.response = this.buildResponse();
};

HelpCommand.prototype.buildResponse = function() {
	var response = 'Lunch.io is a tool that can help your team choose a lunch destination faster.';

	return response;
};

HelpCommand.prototype.getResponse = function() {
	return this.response;
};

module.exports = new HelpCommand();