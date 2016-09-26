/**
 *
 *
 */
require('rootpath')();
var _ = require('underscore');
var request = require('request');

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

        var authParams = {
            grant_type: 'client_credentials',
            client_id: 'qluRB2NWuMUbPhRDXSZLTw',
            client_secret: 'IPr7n7TUsMCx1zXkOWSrZfVqC3GDwEklrWPCUsClXsxAnCVUnOx0gnnZHgGIPdpl'
        };
        var yelpSession = request.post('https://api.yelp.com/oauth2/token', authParams, function sessionEstablished (yelpSession) {
            var businessesParams = {
                latitude: 42.36,
                longitude: 71.06,
                term: 'food'
            };
            request.get('https://api.yelp.com/v3/businesses/search', businessesParams, function yelpResults (yelpResults) {

                var recomendations = [];
                var suggestedBusiness;
                for (var i = 0; i < 3; i++) {
                    suggestedBusiness = yelpResults.businesses[Math.random()];
                    if (!recomendations.hasIndexOf(suggestedBusiness)) {
                        recomendations.push(suggestedBusiness);
                    }
                }


            
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
            });
        });
    }


})
