/**
 *
 *
 */
require('rootpath')();

var _ = require('underscore');
var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');


module.exports = BaseCmd.extend({

    name: "voting",
    description: "Tallies users' choices and returns the selected place to eat.",

    initialize: function(){
        this._super();
    },

    run: function() {

        this.response.send("Hello, are you hungry?");
    },

    getOutput: function() {
    	var template = _.template(`Congratulations! Your team has picked a lunch.
							You will be lunching at <%= place %>.`);
    	var place = this.getResult();

    	return template({place:place});
    },

    /**
     * Retrieves the place with the least number of tallies.
     * 
     * @return {String} The name of a place
     */
    getResult: function() {
    	var places = this.getPlaces();
    	var choices = this.getChoices();
    	var tallies = this.tally(places, choices);
    	var result;

    	_.each(_.keys(tallies), function(place) {
    		if (!result) {
    			result = place;
    		} else {
    			result = (tallies[place] < tallies[result]) ? place : result;
    		}
    	});

    	return result;
    },

    getPlaces: function() {},
    getChoices: function() {},

    /**
     * Takes three lunch options and an object containing users' PickNot choices, 
     * and returns an object with the tallies for each place.
     * 
     * @param  {Object} places  Contains the three calculated places.
     * @param  {Array} choices  List of usernames mapped to a PickNot choice.
     * @return {Object}         Final tallies.
     */
    tally: function(places, choices) {
    	if (Object.keys(places).length > 3) {
    		throw new Error('Cannot have more than three places.');
    	}
    	var tallies = {};

    	_.each(_.values(places), function(v) {
    		tallies[v] = 0;
    	});

    	_.each(choices, function(choice) {
    		if (choice.choice) {
    			var place = places[choice.choice];
    			tallies[place] += 1;
    		}
    	});

    	return tallies;
    }
});

