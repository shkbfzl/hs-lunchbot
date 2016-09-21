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

    /**
     * Call resolve when your command run successfully
     *
     * Call reject after an error
     *
     * @param resolve
     * @param reject
     */
    run: function(resolve, reject) {

        resolve( "Hello, are you hungry?");
    }
})

