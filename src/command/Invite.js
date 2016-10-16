/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var aw = require('async').waterfall;
var BaseCmd = require('src/command/Base.js');
var Config = require('config');
var Auth = require('src/core/Auth');
var SessionModel = require('src/model/mongodb/Session.js');
var _ = require('underscore');
var Promise = require('node-promise');

var responseTexts = [
    'That’s a solid crew you’ve assembled there.',
    'I sent your invitation.'
];


var sendInvitations = function(invId, userList, callback) {

    callback = callback || _.noop;
    var self = this;

    if (userList.length == 0) {
        log.warn("No user to invite");
        callback(null, invId);
    }

    var defrList = [];

    _.each (userList, function(user) {

        var defr = self._invSender.invite(user);
        defrList.push(defr);
    });

    Promise.When(defrList, callback);
};

module.exports = BaseCmd.extend({

    name: "invite",
    description: "invite people",
    _invSender: null,

    initialize: function(){
        this._super();
        this._invSender = new InviteSender();
    },

    setInviteSender: function(obj) {

        if (obj instanceof InvitationSender) {
            var errMsg = 'Object must be instance of InvitationSender';
            throw new IllegalArgumentError(errMsg);
        }

        this._invSender = obj;
    },

    run: function() {

        var slackUsers = this.options.users || [];
        var userId = this.options.user_id;
        var resp = this.response;
        var self = this;

        log.debug("Invitees list= ",slackUsers);

        if (slackUsers.length == 0) {
            resp.error("You must give me a list of users to invite");
            return;
        }

        aw([
            function(cb) {
                Auth.checkUser(userId, cb);
            },
            function(resp, cb) {

                SessionModel.create(userId, slackUsers, cb);
            },
            function (data, cb) {
                log.debug("New invitation =", data);

                self._invitePoster.uniqId = data._id;

                sendInvitations.call(self, slackUsers, cb);
            }
        ], function(err, data){
            log.debug("Error= ",err, ', data=',data);

            if (err) {
                resp.error(err);
                return;
            }

            var randId = _.random(0, 1);
            resp.send(responseTexts[randId]);
        });
    }
});

