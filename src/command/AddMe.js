/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');
var User = require('src/model/dynamodb/User.js');


var createUser = function(uId, userName){

    var self = this;

    User.create(uId, userName, function(err, data){

        if(err){
            log.error(err);
            self.response.send("Oops, please :(");
            return;
        }
        log.debug("User created= ", data);
        var user = User.normalizeItem(data.Attributes);

        var msg = "Hi, "+userName+", nice to meet you.\nAre you hungry?";
        self.response.send(msg);
    })
};

module.exports = BaseCmd.extend({

    name: "hello",
    description: "Being nice",

    initialize: function(){
        this._super();
    },

    run: function() {

        var self = this;
        var uId = this.options.user_id;
        var userName = this.options.user_name;

        User.keyExists(uId, function(bool, data){

            if (bool){
                var user = User.normalizeItem(data.Item);
                var msg =
                    "Hello "+user.Name+", I already"
                    +" know you.\nTotally not creepy :smile:";
                self.response.send(msg);
                return;
            }

            createUser.call(self, uId, userName);
        });
    }
});

