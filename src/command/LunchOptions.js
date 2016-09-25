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

    removeBans : function(user){

      return _.reject(user.Places,
        function(p) {
          return _.contains(users.Banned, p);
        }
      );

    },

    run: function() {

        // TODO getSession db call
        var session = this.options.sessionID;
        
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

        this.response.addAttachment({
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

        });

        this.response.done();
    }


})
