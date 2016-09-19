var assert = require('chai').assert;
var HelpCommand = require('./../modules/helpCommand');

describe('Help Command test', function() {
	var command;

	beforeEach(function() {
		command = new HelpCommand();
	});

	describe('Tests for createCommandResponse', function() {

		it('Returns Reference error for missing description', function() {
			var data = {};

		 	assert.throws(function() {
		 		command.createCommandResponse()
		 	}, ReferenceError, 'description is not defined');
		});

		it('Returns Reference error for missing syntax', function() {
			var data = {description: 'Some description'};

		 	assert.throws(function() {
		 		command.createCommandResponse(data)
		 	}, ReferenceError, 'syntax is not defined');

		 	data.syntax = null;
		 	assert.doesNotThrow(function() {
		 		command.createCommandResponse(data)
		 	}, ReferenceError, 'syntax is not defined');
		});

		it('Returns Reference error for missing syntax', function() {
			var data = {description: 'test001',
						syntax: 'test002'};
			var data = {description: null,
						syntax: null};
			var template = '>>> ** \n ';

		 	assert.equal(command.createCommandResponse(data), template);
		});
	});
});