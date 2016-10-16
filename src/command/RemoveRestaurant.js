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

    name: "hello",
    description: "Being nice",

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

            UserModel.removeByPlaceName(
                userId,
                restaurant,
                function(err, data) {

                    resp.send("No problem, done.");
            });

        });

    }
});

