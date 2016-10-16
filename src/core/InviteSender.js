/**
 * Created by mohamed.kante on 9/20/16.
 */

require('rootpath')();

var Class = require('backbone-class');
var log = require('log4js').getLogger(__filename);
var _ = require('underscore');
var Config = require('config');
var Request = require('request');
var Deferred = require('node-promise').defer;

var feedbackHost = Config.inviteFeedbackUrl;
var webHookHost = Config.slack.webHookURL;

module.exports = Class.extend({

    uniqId: null,

    invite: function(userId) {

        var callbackEndpoint = feedbackHost+'/invites/'+this.uniqId+'/feedback';

        var data = {
            channel: userId,
            text: 'Your colleague send you a lunch invitation',
            attachments: [
                {
                    text: "Do you accept this invitation?",
                    fallback: "Do you accept this invitation",
                    callback_id: callbackEndpoint,
                    color: "#3AA3E3",
                    attachment_type: "default",
                    actions: [
                        {
                            name: "accept",
                            text: "Accept",
                            type: "button",
                            value: "accept"
                        },
                        {
                            name: "decline",
                            text: "Decline",
                            style: "danger",
                            type: "button",
                            value: "decline",
                        }
                    ]
                }
            ]
        };

        log.debug('WebHookURL = ', webHookHost);
        log.debug('Post data= ', data);

        return this.postData(data);
    },

    postData: function(data) {

        var defr = deferred();

        Request.post(webHookHost, data)
            .on('response', function(resp){

                defr.resolve(resp);
            })
            .on('error', function(resp) {

                defr.reject(resp);
            })
        ;
        return defr;
    }
});
