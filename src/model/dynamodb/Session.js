/**
 * Created by mohamed.kante on 9/26/16.
 */


require('rootpath')();

var clientDB = require('src/model/dynamodb/Client.js');
var log = require('log4js').getLogger(__filename);
var _ = require('underscore');
var BaseModel = require('src/model/dynamodb/Base');
var shortid = require('shortid');
var pjson = require('src/util/pretty_json');
var Obj = require("object-path");
var trimlow = require('src/util/trimlow_text.js');

module.exports = BaseModel.extend({}, {

    table: "Sessions",

    create: function(key, userList, callback) {

        this.collection().insert({
            _id: key,
            users: userList
        }, callback);
    },

});