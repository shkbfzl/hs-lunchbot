/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');


module.exports = BaseCmd.extend({

    name: "hello",
    description: "Being nice",

    initialize: function(){
        this._super();
    },

    run: function() {

        this.response.send("Hello, are you hungry?");
    }
});

