require('rootpath')();

var assert = require('chai').assert;
var sinon = require('sinon');
var VotingCommand = require('src/command/Voting');

describe('Voting Command test', function() {
	var command;

	beforeEach(function() {
		command = new VotingCommand();
	});

	describe('Tests getPlaces method', function() {
		
	});

	describe('Tests getUserChoices method', function() {

	});

	describe('Tests tally method', function() {

		it('Returns an error when there are more than three places', function() {
			var places = getTestPlaces();
			places["4"] = "testPlace004";
			var choices = [
				{user:'testUser001', choice:"1"},
				{user:'testUser002', choice:"3"},
				{user:'testUser003', choice:"1"}
			];

			assert.throws(function() {
				command.tally(places, choices);
			}, Error, 'Cannot have more than three places.');
		});

		it('Returns tallies when no users have voted', function() {
			var choices = [
				{user:'testUser001', choice:null},
				{user:'testUser002', choice:null},
				{user:'testUser003', choice:null}
			];
			var expected = {
				"testPlace001": 0,
				"testPlace002": 0,
				"testPlace003": 0
			};

			assert.deepEqual(command.tally(getTestPlaces(), choices), expected);
		});

		it(`Returns tallies when one place has most votes 
			and one place has no votes`, function() {
			var choices = [
				{user:'testUser001', choice:"1"},
				{user:'testUser002', choice:"3"},
				{user:'testUser003', choice:"1"}
			];
			var expected = {
				"testPlace001": 2,
				"testPlace002": 0,
				"testPlace003": 1
			};

			assert.deepEqual(command.tally(getTestPlaces(), choices), expected);
		});

		it('Returns tallies when there is a two-way tie', function() {
			var choices = [
				{user:'testUser001', choice:"3"},
				{user:'testUser002', choice:"3"},
				{user:'testUser003', choice:"3"}
			];
			var expected = {
				"testPlace001": 0,
				"testPlace002": 0,
				"testPlace003": 3
			};

			assert.deepEqual(command.tally(getTestPlaces(), choices), expected);
		});

		it('Returns tallies when there is a three-way tie', function() {
			var choices = [
				{user:'testUser001', choice:"1"},
				{user:'testUser002', choice:"2"},
				{user:'testUser003', choice:"3"}
			];
			var expected = {
				"testPlace001": 1,
				"testPlace002": 1,
				"testPlace003": 1
			};

			assert.deepEqual(command.tally(getTestPlaces(), choices), expected);
		});
	});

	describe('Tests getResult method', function() {
		var tallyMethodStub;
		var getPlacesMethodStub;
		var getChoicesMethodStub;

		beforeEach(function() {
			tallyMethodStub = sinon.stub(command, "tally");
			getPlacesMethodStub = sinon.stub(command, "getPlaces");
			getChoicesMethodStub = sinon.stub(command, "getChoices");
		});

		it('Returns the place with the least tallies', function() {
			tallyMethodStub.returns({
				"testPlace001": 2,
				"testPlace002": 0,
				"testPlace003": 1
			});
			var expected = "testPlace002";

			assert.equal(command.getResult(), expected);
		});

		it('Returns the first place in a three-way tie', function() {
			tallyMethodStub.returns({
				"testPlace001": 1,
				"testPlace002": 1,
				"testPlace003": 1
			});
			var expected = "testPlace001";

			assert.equal(command.getResult(), expected);
		});

		it('Returns the topmost place in a two-way tie', function() {
			tallyMethodStub.returns({
				"testPlace001": 3,
				"testPlace002": 0,
				"testPlace003": 0
			});
			var expected = "testPlace002";

			assert.equal(command.getResult(), expected);

		});
	});

	describe('Tests getOutput method', function() {
		var getResultMethodStub;

		beforeEach(function() {
			getResultMethodStub = sinon.stub(command, "getResult");
		});

		it('Returns output with result place inserted', function() {
			getResultMethodStub.returns("testPlace001");
			var expected = 'Congratulations! Your team has picked a lunch. You will be lunching at testPlace001.';

			assert.equal(command.getOutput(), expected);
		});
	});
});

function getTestPlaces() {
	return  {
				"1": "testPlace001",
				"2": "testPlace002",
				"3": "testPlace003"
			};
			
}