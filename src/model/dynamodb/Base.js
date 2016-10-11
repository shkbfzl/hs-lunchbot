/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var log = require('log4js').getLogger(__filename);
var clientDB = require('src/core/datasource/DynamodbConnection.js');
var Class = require('backbone-class');
var _ = require('underscore');
var pretty_json = require('src/util/pretty_json.js');

module.exports = Class.extend({}, {

    DB: clientDB,
    table: null,

    getAll: function(callback) {

        callback = callback || function(){};
        var self = this;

        this.DB.scan(
            {
                TableName: this.table
            },
            function(err, data){

            if (err) {
                callback(err, data);
                return;
            }
            log.debug("Get all "+self.table);
            log.debug(pretty_json(data));
            var objs  = self.normalizeItem(data.Items);
            callback(err, objs);
        });
    },

    deleteById: function(ID, callback){

        this.DB.deleteItem({
            TableName: this.table,
            Key: {
                Id: {S: ID}
            }
        }, callback);

    },

    getById: function(ID, callback) {

        this.DB.getItem({
            TableName: this.table,
            Key: {
                Id: {S: ID}
            },
        }, callback);
    },

    keyExists: function(key, callback) {

        callback = callback || _.noop();
        var self = this;

        this.getById(key,function(err, data){

            if (err) {
                log.error(err);
            }
            var bool = (data.Item)? true: false;
            log.debug("Key exists ="+bool+", Error=", err, ", Data=", data);
            callback(bool, data);
        });

    },

    normalizeItems: function(items){

        var list = [];
        var self = this;

        for( var idx in items){
            var item = items[idx];
            list[idx] = self.normalizeItem(item);
        };

        return list;
    },

    normalizeItem: function(data) {

        if (!data) {
            return null;
        }

        if (data instanceof Array) {
            return this.normalizeItems(data);
        }

        var self = this;
        var obj =  {};
        _.each(data, function(val, key) {

            //log.debug("val=",val, ", key=", key);
            var norm = null;

            _.each(val, function(val2, type){

                switch (type){
                    case 'S':
                        norm = val[type];
                        break;
                    case 'N':
                        norm = val[type];
                        break;
                    case 'SS':
                        norm = val[type];
                        break;
                    case 'M':
                        norm = self.normalizeItem(val[type]);
                        break;
                }
            })

            obj[key] = norm;
        });

        return obj;
    },
});
