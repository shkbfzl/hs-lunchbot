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

    /**
     * Call resolve when your command run successfully
     *
     * Call reject after an error
     *
     * @param resolve
     * @param reject
     */
    run: function(resolve, reject) {
        resolve(
          // get context object
          //

          // mark user as having picked
          // if all users picked figure final
        );

        reject();
    }
})
