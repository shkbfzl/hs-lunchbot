/**
 *
 *
 */
require('rootpath')();
var _ = require('underscore');

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');

var session;

module.exports = BaseCmd.extend({

    name: "lunchOptions",
    description: "Get 3 lunch options from a session",

    initialize: function(sessionID){
      this.session = sessionID;
      this._super();
    },

    removeBans : function(user){
      return _.reject(user.Places,
        function(p) {
          return _.contains(users.Banned, p);
        }
      );
    }

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
          // TODO getSession db call
          var users = getSession(session).Item.Users;
          // pull places that aren't banned
          var places = _.each(users, this.removeBans);
          // count
          var counts = {};
          for(var i = 0; i< places.length; i++) {
            var p = places[i].Name;
            counts[p] = counts[p] ? counts[p] + 1 : 1;
          }
          var sorts = _.sortBy(counts, function(x) { return parseInt(x.value) } );


          // get context object? with User and value of action
          // https://api.slack.com/docs/message-buttons#crafting_your_message
          var res = {
            "text": "",
            "attachments": [
              {
                "text": "Pick out the place you want least",
                "fallback": "lol no lunch for you",
                "callback_id": "PickNot",
                "attachment_type": "default",
                "actions": [
                  {
                    "name": Object.keys(sorts)[Object.keys(sorts).length-1],
                    "text": Object.keys(sorts)[Object.keys(sorts).length-1],
                    "type": "button",
                    "value": Object.keys(sorts)[Object.keys(sorts).length-1],
                  },
                  {
                    "name": Object.keys(sorts)[Object.keys(sorts).length-2],
                    "text": Object.keys(sorts)[Object.keys(sorts).length-2],
                    "type": "button",
                    "value": Object.keys(sorts)[Object.keys(sorts).length-2],
                  },
                  {
                    "name": Object.keys(sorts)[Object.keys(sorts).length-3],
                    "text": Object.keys(sorts)[Object.keys(sorts).length-3],
                    "type": "button",
                    "value": Object.keys(sorts)[Object.keys(sorts).length-3],
                  }
                ]

              }
            ]
          }
          return res;
        );

        reject();
    }


})
