/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');
var UserModel = require('src/model/mongodb/User');
var Auth =  require('src/core/Auth');


module.exports = BaseCmd.extend({

    name: "AddRestaurant",
    description: "Add new restaurant",

    initialize: function(){
        this._super();
    },

    run: function() {

        var restaurant= this.options.place;
        var userId = this.options.user_id;
        var resp = this.response;

        if (!restaurant) {
            resp.error("Sorry, I didn't get your restaurant name");
            return;
        }

        Auth.checkUser(userId, function(err, data) {

            if (err) {
                resp.error(err);
                return;
            }

            UserModel.addPlace(userId, restaurant, function(err, data){

                if (err){
                    resp.error(err);
                    return;
                }

                var text =
                    "Great choice. I added `"+
                    restaurant+"` to your favorites.";
                resp.send(text);
            });

        });
    },

});

