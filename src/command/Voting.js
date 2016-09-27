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
    }
});

