/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');


module.exports = BaseCmd.extend({

    name: "Choice",
    description: "Choosing a place",

    initialize: function(){
        this._super();
    },

    run: function() {

        this.response.send("I got that. Waiting on your friends");
    }
});

