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

    name: "RemoveBan",
    description: "Remove restaurant from ban list",

    initialize: function(){
        this._super();
    },

    run: function() {

        var restaurant= this.options.place;
        var userId = this.options.user_id;
        var resp = this.response;

        Auth.checkUser(userId, function(err, data) {

            if (err) {
                resp.error(err);
                return;
            }

            UserModel.removeFromBannedList(
                userId,
                restaurant,
                function(err, data){

                    if (err){
                        resp.error(err.message);
                        return;
                    }

                    resp.send("ok, I updated your banned list");
                });

        });
    }
});

