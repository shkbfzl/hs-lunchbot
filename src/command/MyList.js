/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');


module.exports = BaseCmd.extend({

    name: "mylist",
    description: "Show my list",

    initialize: function(){
        this._super();
    },

    run: function() {

        this.response.send("Hello, are you hungry?");
    }
});

