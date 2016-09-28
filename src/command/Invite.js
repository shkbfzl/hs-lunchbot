/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var async = require('async');
var BaseCmd = require('src/command/Base.js');
var Config = require('config');
var Slack = require('slack-node');
var User = require('src/model/dynamodb/User.js');
var _ = require('underscore');

var getChannelName = function() {
    var channelName = new Date().toISOString().slice(0, 10);
    return 'Lunch-' + channelName; 
};

var getSlack = function() {
    var apiToken = Config.slack.api_token;
    return new Slack(apiToken);
};

var normalizeUsersToInvite = function(usersToInvite) {
    var results = [];
    if (!usersToInvite) {
        return results;
    }

    for (var i = 0; i < usersToInvite.length; i++) {
        if (usersToInvite[i]) {
            results[i] = usersToInvite[i].replace('@', '');
        }
    }

    return results;
};

module.exports = BaseCmd.extend({

    name: "invite",
    description: "invite people",

    initialize: function(){
        this._super();
    },

    run: function() {
        var slackUsers = [];
        var channelName = getChannelName();
        var slack = getSlack();
        var usersToInvite = normalizeUsersToInvite(this.options.users);
        var commandResponseObj = this.response;

        async.waterfall([
            function(cb) {
                slack.api("users.list", function(err, response) {
                    if (err) {
                        cb(err, 'Unable to retrieve Slack user list');
                        return;
                    } else {
                        console.log('slack user list: %j', response.members);
                        slackUsers = response.members;
                        cb(null, null);
                    }
                });
            },
            function(result, cb) {
                slack.api('channels.join', {
                    name: channelName
                }, function(err, response){
                    console.log('channels.join response: %j', response);
                    if (err) {
                        cb(err, 'Cannot create channel');
                        return;
                    }
                    cb(null, response);
                });
            },
            function(result, cb) {
                async.each(usersToInvite, function(userToInvite, callback) {
                //slackUsers = _.indexBy(response.members, 'name');
                
                    var slackUser = _.findWhere(slackUsers, { 'name': userToInvite });
                    if (slackUser === undefined) {
                        console.log('Unable to find the user %j', userToInvite);
                        callback();
                    }

                    slack.api('channels.invite', {
                        channel: result.channel.id,
                        user: slackUser.id
                    }, function(err, inviteResponse) {
                        if (err) {
                            console.log('Unable to invite %j with error: %j', slackUser.id, err);
                        } else {
                            console.log('channels.invite response: %j', inviteResponse);
                        }
                        callback();
                    });
                }, function(err) {
                    cb(null, result);
                });
            },
        ], function(err, result) {
            var texts = [
                'That’s a solid crew you’ve assembled there.',
                'I sent your invitation.'
            ];

            var randId = _.random(0,1);
            commandResponseObj.send(texts[randId]);
        });
    }
});

