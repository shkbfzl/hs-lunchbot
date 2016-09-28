/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');
var User = require('src/model/dynamodb/User.js');

var getUserLists = function(uId, callback) {
    var userLists = {"Favorites":"","Bans":""};

    // Get User record
    User.getById(uId, function(err, data) {

        if (err) {
            log.error("Error= ",err);
            callback(err);
        }
        else {
            data = User.normalizeItem(data.Item);

            if (data && data.Places) {
                var bans = data.Banned;
                var favoritesText = "";
                var bansText = "";

                // Split Places into Favorites and Bans
                for(var key in data.Places) {
                    if (bans.indexOf(key) == -1) {
                        favoritesText += " - " + data.Places[key];
                    }
                    else {
                        bansText += " - " + data.Places[key];
                    }
                };

                if (favoritesText !== "") {
                    userLists.Favorites = favoritesText;
                }
                if (bansText !== "") {
                    userLists.Bans = bansText;                    
                }

                log.info(userLists);
                callback(null, userLists);
            }
            else {
                // No Data or no Places
                var dataErr = new Error('Restaurants cannot be found.');
                callback(dataErr);
            }
        }
    });
};


module.exports = BaseCmd.extend({

    name: "mylist",
    description: "Show my list",

    initialize: function(){
        this._super();
    },

    run: function() {

        log.info(this.options);

        var self = this;
        var uId = self.options.user_id;

        getUserLists(uId, function(err, data){
            if (err){
                this.response.send("Lunch.io could not find any restaurant choices.");
            }
            else {
                if (data.Favorites) {
                    this.response.addAttachment({
                        title: "Favorite places.",
                        mrkdwn_in: [
                            "text"
                        ],
                        text: data.Favorites
                    });
                }
                if (data.Bans) {
                    this.response.addAttachment({
                        title: "Banned places.",
                        mrkdwn_in: [
                            "text"
                        ],
                        text: data.Bans
                    });
                }
                log.info(this.response);
                this.response.send("Lunch.io is a tool that can" +
                    " help your team choose a lunch " +
                    "destination faster.");
            }
        });
    }
});
