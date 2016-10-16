/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');
var _  = require('underscore');
var UserModel = require('src/model/mongodb/User');
var Auth =  require('src/core/Auth');

var texts = [
    "I don't like that place too much either.",
    "I feel the same."
];
var randId= _.random(0, 1);

module.exports = BaseCmd.extend({

    name: "AddBan",
    description: "Add restaurant to ban list",

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

            UserModel.addToBannedList(
                userId,
                restaurant,
                function(err, data){

                    if (err){
                        resp.error(err.message);
                        return;
                    }

                    resp.send(texts[randId]);
            });

        });

    }
});

