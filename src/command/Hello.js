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

    /**
     *
     * @returns {string}
     */
    run: function() {

        /*
         * ---------------------------------
         * Put all your command logic here
         * ---------------------------------
         */

        return "Hello, are you hungry?";
    }
})

