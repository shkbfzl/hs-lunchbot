/**
 *
 *
 */
require('rootpath')();

var _ = require('underscore');
var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');
var Session = require('src/model/dynamodb/Session.js');


module.exports = BaseCmd.extend({

    name: "voting",
    description: "Tallies users' choices and returns the selected place to eat.",

    initialize: function(){
        this._super();
    },

    run: function() {

        var output = this.getOutput();

        this.response.send(output);
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

    getPlaces: function() {
        var dummyData = {
            "1": "Cosi",
            "2": "Pizza",
            "3": "Al's"
        };

        // Add call to session for lunch options
        
        return dummyData;
    },
    getChoices: function() {
        var dummyData = [
            {"user": "user01", "choice": 2},
            {"user": "user02", "choice": 3},
            {"user": "user03", "choice": 2}
        ];

        // Add call to session for user choices
        
        return dummyData;
    },

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

