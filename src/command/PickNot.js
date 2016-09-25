/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');

var session;

module.exports = BaseCmd.extend({

    name: "pickNot",
    description: "Choosing the lunch option one doesn't want",

    initialize: function(sessionID){
      this.session = sessionID;
      this._super();
    },

    run: function() {

        this.response.send("")
    }
})
