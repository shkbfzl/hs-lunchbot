/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var log = require('log4js').getLogger(__filename);
var clientDB = require('src/core/datasource/MongodbConnection.js');
var Class = require('backbone-class');
var _ = require('underscore');
var pretty_json = require('src/util/pretty_json.js');

module.exports = Class.extend({}, {

    DB: clientDB,
    collection: null,

    getAll: function(callback) {

        callback = callback || function(){};
        var self = this;

        this.DB[this.collection].find({}, callback);
    },

    deleteById: function(ID, callback){

        this.DB[this.collection].remove({ _id: ID }, callback);

    },

    getById: function(ID, callback) {

        this.DB[this.collection]
            .findOne({ _id: ID }, callback);
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
