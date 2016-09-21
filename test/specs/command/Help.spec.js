/**
 * Help command test file
 */

require('rootpath')();

var assert = require('chai').assert;
var HelpCommand = require('src/command/Help');

describe('Help Command test', function() {
	var command;

	beforeEach(function() {
		command = new HelpCommand();
	});

	describe('Tests for createCommandResponse', function() {

		it('Returns Reference error for missing description', function() {
			var data = {};

		 	assert.throws(function() {
		 		command.createCommandResponse(data)
		 	}, ReferenceError, 'description is not defined');
		});

		it('Returns Reference error for missing syntax', function() {
			var data = {description: 'Some description'};

		 	assert.throws(function() {
		 		command.createCommandResponse(data)
		 	}, ReferenceError, 'syntax is not defined');
		});

		it('Does not return Reference error for missing examples', function() {
			var data = {description: 'Some description',
						syntax: 'Some syntax'};

			// Examples are defaulted to an empty string
		 	assert.doesNotThrow(function() {
		 		command.createCommandResponse(data)
		 	}, ReferenceError, 'examples is not defined');
		});

		it('Returns response with no data filled in', function() {
			var data = {description: null,
						syntax: null,
						examples: null};
			var template = '> ** \n>  \n> ';

		 	assert.equal(command.createCommandResponse(data), template);
		});

		it('Returns response with data filled in.', function() {
			var data = {description: 'test001',
						syntax: 'test002',
						examples: ['test003']};
			var template = '> *test001* \n> test002 \n> Example: `test003`\n';

		 	assert.equal(command.createCommandResponse(data), template);
		});
	});

	describe('Tests for createExampleResponse', function() {

		it('Returns String with two backticks given null value.', function() {
			assert.equal(command.addExampleResponse(null), '');
		});

		it('Returns input String between two backticks', function () {
			assert.equal(command.addExampleResponse('test001'), 'Example: `test001`');
		});

		it('Returns input Number between two backticks', function () {
			assert.equal(command.addExampleResponse(42), 'Example: `42`');
		});
	});

	describe('Tests for createExamplesResponse', function() {

		it('Returns empty string given null value.', function() {
			assert.equal(command.createExamplesResponse(null), '');
		});

		it('Returns empty string given empty list of examples.', function() {
			assert.equal(command.createExamplesResponse([]), '');
		});

		it('Returns single example, between backticks.', function() {
			var data = ['test001'];

			assert.equal(command.createExamplesResponse(data), 'Example: `test001`\n');
		});

		it('Returns multiple example, between backticks.', function() {
			var data = ['test001', 'test002'];

			assert.equal(command.createExamplesResponse(data), 'Example: `test001`\nExample: `test002`\n');
		});
	});

	describe('Tests for getCommandResponse', function() {

		it('Returns error when command cannot be found');

		it('Returns correct response object');
	});
});