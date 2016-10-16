/**
 * Created by mohamed.kante on 9/26/16.
 */


require('rootpath')();

var log = require('log4js').getLogger(__filename);
var _ = require('underscore');
var BaseModel = require('src/model/mongodb/Base');
var shortid = require('shortid');
var pjson = require('src/util/pretty_json');
var Obj = require("object-path");
var trimlow = require('src/util/trimlow_text.js');

var OPEN_STATUS = 'open';
var SCHEDULE_STATUS = 'scheduling';
var CLOSED_STATUS = 'closed';

module.exports = BaseModel.extend({}, {

    table: "Sessions",

    create: function(userId, userList, callback) {

        var timestamp = new Date().time();

        this.collection()
            .insert({
                invitorId: userId,
                invitees: userList,
                status: OPEN_STATUS,
                createdAt: timestamp
            }, callback);
    },
});