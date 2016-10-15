/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');
var User = require('src/model/mongodb/User.js');
var Auth = require('src/core/Auth');
var Obj = require('object-path');


/**
 *
 * @constructor
 */
var RestaurantChoice = function(){
    this.favorites = [];
    this.bans = [];
};


module.exports = BaseCmd.extend({

    name: "mylist",
    description: "Show my list",

    initialize: function(){
        this._super();
    },

    run: function() {

        log.info(this.options);

        var self = this,
            uId = self.options.user_id;

        Auth.checkUser(uId, function(err, user){

            if (err){
                self.response.error(err);
                return;
            }

            var restaurantGroup = self.getUserLists(user);

            self.setResponseAttachments(restaurantGroup);

            self.response.done();
        });
    },

    getUserLists: function(userData) {

        var userLists = new RestaurantChoice(),
            places,
            bans;

        log.debug("User data = ", userData);
        userData = Obj(userData);
        places = userData.get('places', []);
        bans = userData.get('bans', []);

        for(var key in places) {
            if (bans.indexOf(key) == -1) {
                userLists.favorites.push(places[key])
            }
            else {
                userLists.bans.push(places[key]);
            }
        }

        log.debug("User list = ", userLists);

        return userLists;
    },

    setResponseAttachments:function(myPlaces){

        var favorites = "You have no restaurant in your list",
            bannedPlaces = "You have no restaurant in your list";

        if (myPlaces.favorites.length > 0) {
            favorites = '\n- '+myPlaces.favorites.join("\n- ");
        }

        if (myPlaces.bans.length > 0) {
            bannedPlaces = '\n- '+myPlaces.bans.join("\n-");
        }

        log.debug("Favorite places= ", favorites);
        log.debug("Banned places= ", bannedPlaces);

        this.response.addAttachment({
            title: "Favorite places.",
            mrkdwn_in: [
                "text"
            ],
            text: favorites
        });

        this.response.addAttachment({
            title: "Banned places.",
            mrkdwn_in: [
                "text"
            ],
            text: bannedPlaces
        });
    }

});
