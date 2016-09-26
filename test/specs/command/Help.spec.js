/**
 * Help command test file
 */

require('rootpath')();

var assert = require('chai').assert;
var HelpCommand = require('src/command/Help');
var config = require('config/config.help.command.json');

describe('Help Command test', function() {
	var command;

	beforeEach(function() {
		config.commands = createStubConfig();
		command = new HelpCommand();
	});

	describe('Tests for createCommandResponseObject', function() {

		it('Returns Reference error for missing description', function() {
			var data = {syntax: 'Some syntax'};
			var response = {
				"title": undefined,
				"text": "Some syntax \n",
				"mrkdwn_in": ["text"]
			};

		 	assert.deepEqual(command.createCommandResponseObject(data), response);
		});

		it('Returns Reference error for missing syntax', function() {
			var data = {description: 'Some description'};

		 	assert.throws(function() {
		 		command.createCommandResponseObject(data)
		 	}, ReferenceError, 'syntax is not defined');
		});

		it('Does not return Reference error for missing examples', function() {
			var data = {description: 'Some description',
						syntax: 'Some syntax'};

			// Examples are defaulted to an empty string
		 	assert.doesNotThrow(function() {
		 		command.createCommandResponseObject(data)
		 	}, ReferenceError, 'examples is not defined');
		});

		it('Returns response with no data filled in', function() {
			var data = {description: null,
						syntax: null,
						examples: null};
			var responseObj = {
				"title": null,
				"text": " \n",
				"mrkdwn_in": [
	                "text"
	            ]
			};

		 	assert.deepEqual(command.createCommandResponseObject(data), responseObj);
		});

		it('Returns response with data filled in.', function() {
			var data = {description: 'test001',
						syntax: 'test002',
						examples: ['test003']};
			var responseObj = {
				"title": "test001",
				"text": "test002 \nExample: `test003`\n",
				"mrkdwn_in": ["text"]
			};

		 	assert.deepEqual(command.createCommandResponseObject(data), responseObj);
		});
	});

	describe('Tests for addExampleResponse', function() {

		it('Returns String with two backticks given null value.', function() {
			assert.equal(command.addExampleResponse(null), "");
		});

		it('Returns input String between two backticks', function () {
			assert.equal(command.addExampleResponse('test001'), "Example: `test001`");
		});

		it('Returns input Number between two backticks', function () {
			assert.equal(command.addExampleResponse(42), "Example: `42`");
		});
	});

	describe('Tests for createExamplesResponse', function() {

		it('Returns empty string given null value.', function() {
			assert.equal(command.createExamplesResponse(null), "");
		});

		it('Returns empty string given empty list of examples.', function() {
			assert.equal(command.createExamplesResponse([]), "");
		});

		it('Returns single example, between backticks.', function() {
			var data = ['test001'];

			assert.equal(command.createExamplesResponse(data), "Example: `test001`\n");
		});

		it('Returns multiple example, between backticks.', function() {
			var data = ['test001', 'test002'];

			assert.equal(command.createExamplesResponse(data), "Example: `test001`\nExample: `test002`\n");
		});
	});

	describe('Tests for getCommandResponse', function() {

		it('Returns error when command cannot be found', function() {
			var cmdName = 'testCmd000';

			assert.throws(function() {
		 		command.getCommandResponse(cmdName);
		 	}, Error, 'Command cannot be found.');
		});

		it('Returns correct response object', function() {
			var cmdName = 'testCmd001';
			var expected = {
				text: '*This is testCmd001* \n/bot testCmd001 \n'
			};

			assert.deepEqual(command.getCommandResponse(cmdName), expected);
		});

		it('Returns correct response object with examples', function() {
			var cmdName = 'testCmd002';
			var expected = {
				text: '*This is testCmd002* \n/bot testCmd002 <param1> \nExample: `/bot testCmd002 p1`\nExample: `/bot testCmd002 p2`\n'
			};

			assert.deepEqual(command.getCommandResponse(cmdName), expected);
		});
	});

	describe('Tests for getResponse', function() {
		it('Returns full response object', function() {
			var expected = {};

			expected.text = 'Lunch.io is a tool that can help your team choose a lunch destination faster.';
			expected.attachments = [ 
				{ 
					"title": "This is testCmd001",
					"text": "/bot testCmd001 \n",
					"mrkdwn_in": ["text"]
				},
			    { 
			    	"title": "This is testCmd002",
			    	"text": "/bot testCmd002 <param1> \nExample: `/bot testCmd002 p1`\nExample: `/bot testCmd002 p2`\n",
					"mrkdwn_in": ["text"]
			    }
			];

			assert.deepEqual(command.getOutput(), expected);
		});
	});
});

function createStubConfig() {
	var commands = [];

	commands.push({
		name: 'testCmd001',
		description: 'This is testCmd001',
		syntax: '/bot testCmd001',
		examples: []
	});
	commands.push({
		name: 'testCmd002',
		description: 'This is testCmd002',
		syntax: '/bot testCmd002 <param1>',
		examples: [
			'/bot testCmd002 p1',
			'/bot testCmd002 p2'
		]
	});

	return commands;
}