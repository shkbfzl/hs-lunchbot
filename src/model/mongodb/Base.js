/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var log = require('log4js').getLogger(__filename);
var Class = require('backbone-class');
var _ = require('underscore');
var pretty_json = require('src/util/pretty_json.js');

var client = null;

module.exports = Class.extend({}, {

    table: null,

    setDb: function(db) {
        client = db;
    },

    getAll: function(callback) {

        callback = callback || _.noop;

        this.collection().find({}, callback);
    },

    collection: function () {

        return client.collection(this.table);
    },

    deleteById: function(ID, callback){

        this.collection().remove({ _id: ID }, callback);
    },

    getById: function(ID, callback) {

        this.collection().findOne({ _id: ID }, callback);
    },

    update: function(ID, params, callback) {

        this.collection()
            .update(
                { _id: ID },
                { $set: params },
                callback);
    },

    keyExists: function(key, callback) {

        callback = callback || _.noop();
        var self = this;

        this.getById(key,function(err, data){

            if (err) {
                log.error(err);
            }
            var bool = (data)? true: false;
            log.debug("Key exists ="+bool+", Error=", err, ", Data=", data);
            callback(bool, data);
        });

    }
});
