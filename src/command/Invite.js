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

module.exports = BaseCmd.extend({

    name: "invite",
    description: "invite people",

    initialize: function(){
        this._super();
    },

    run: function() {

        console.log('Received options: ', JSON.stringify(this.options.users, null, 2));

        var userList = [];
        var channelName = new Date().toISOString().slice(0, 10);
        channelName = 'Lunch-' + channelName;

        apiToken = Config.slack.api_token;
        console.log('apiToken: %j', apiToken);
        slack = new Slack(apiToken);

        async.waterfall([
            function(cb) {
                slack.api("users.list", function(err, response) {
                    console.log('slack user list: %j', response.members);
                    userList = _.indexBy(response.members, 'name');
                    console.log('indexed userList: %j', userList);
                    console.log('find user: %j', userList['josiahtest']);
                    cb(null, userList);
                });
            },
            function(result, cb) {
                slack.api('channels.join', {
                    name: channelName
                }, function(err, joinResponse){
                    console.log('channels.join response: %j', joinResponse);
                    if (err) {
                        callback(null, 'Cannot create channel');
                        return;
                    }
                    cb(null, joinResponse);
                });
            },
            function(result, cb) {
                slack.api('channels.invite', {
                    channel: result.channel.id,
                    user: userList['josiahtest'].id
                }, function(err, inviteResponse){
                    console.log('channels.invite response: %j', inviteResponse);
                    cb(null, inviteResponse);
                });
            }
        ], function(err, result) {
            var texts = [
                'That’s a solid crew you’ve assembled there.',
                'I sent your invitation.'
            ];

            var randId = _.random(0,1);
            this.response.send(texts[randId]);
        });
    }
});

