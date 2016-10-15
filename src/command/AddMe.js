/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');
var User = require('src/model/mongodb/User.js');
var aw = require('async').waterfall;


var createUser = function(uId, userName){

    var self = this;

    log.debug('Adding new user');

    User.create(uId, userName, function(err, data){

        if(err){
            log.error(err);
            self.response.error("Oops, I couldn't add your name to my list");
            return;
        }
        log.debug("User created= ", data);

        var msg = "Hi, "+userName+" nice to meet you.\nAre you hungry?";
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

        log.info("Options =", this.options);

        var self = this;
        var uId = this.options.user_id;
        var userName = this.options.user_name;

        if (!userName) {
            this.response.error("Hm, I didn't get your name");
            return;
        }

        User.getById(uId, function(err, data){

            if (data){
                var msg =
                    "Hello "+data.name+", I already"
                    +" know you.\nTotally not creepy :smile:";
                self.response.send(msg);
                return;
            }

            createUser.call(self, uId, userName);
        });
    }
});

