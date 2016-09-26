/**
 * Created by mohamed.kante on 9/26/16.
 */


require('rootpath')();

var clientDB = require('src/model/dynamodb/Client.js');
var log = require('log4js').getLogger(__filename);
var _ = require('underscore');
var BaseModel = require('src/model/dynamodb/Base');
var shortid = require('shortid');

var table = "Users";

module.exports = BaseModel.extend({}, {

    table: "Users",

    setName: function(key, name, callback) {

        return clientDB.putItem({
            TableName: table,
            Item: {
                Id: {S: key},
                Name: {S: name}
            },

        }, callback);
    },

    putPlaces: function(key, restaurantList, callback) {

        var places = {} ;

        _.each(restaurantList, function(restaurant) {

            var newId = shortid.generate();
            log.debug("Restaurant short ID= ", newId);
            places[newId] = {S: restaurant};
        });

        this.DB.putItem({
            TableName: this.table,
            Item: {
                id: { S: key },
                places: { M: places }
            },

        }, callback);
    },

    putPlace: function(key, restaurant, callback) {
        this.putPlaces(key, [restaurant], callback);
    },

    removePlace: function (key, restId) {

        this.DB.putItem({
            TableName: this.table,
            Item: {
                id: { S: key },
                places: places
            },
        }, callback);
    },

});