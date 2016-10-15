/**
 * Created by mohamed.kante on 10/13/16.
 */

require('rootpath')();

var log = require('log4js').getLogger(__filename);
var User  = require('src/model/mongodb/User.js');

module.exports = {

    checkUser: function(uId, callback){

        callback = callback || _.noop();

        User.getById(uId, function(err, data){

            if (data) {
                log.debug("User already registered");
                callback(null, data);
                return;
            }

            log.warn("User not registered");

            var msg = "Hmm, I don't know you yet. Add yourself to my list.";
            callback(msg, null);
        });
    }
};
