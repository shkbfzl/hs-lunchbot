require('rootpath')();

var assert = require('chai').assert;
var VotingCommand = require('src/command/Voting');

describe('Voting Command test', function() {
	var command;

	beforeEach(function() {
		command = new VotingCommand();
	});

	describe('Tests getPlaces method');

	describe('Tests getUserChoices method');

	describe('Tests tally method', function() {

		it('Returns first choice when no users have voted');

		it('Returns the place with the least tallies');

		it('Returns the first choice in case of a 2-way tie');
	});

	describe('Tests getResult method');
});