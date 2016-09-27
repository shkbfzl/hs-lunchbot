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

var table = "Users";

var updatePlaces = function(key, places, callback) {

    log.debug("New restaurant list: ", places);

    this.DB.updateItem({
        TableName: this.table,
        Key: {
            Id: { S: key }
        },
        AttributeUpdates: {
            Places: {
                Action: 'PUT',
                Value: { M: places }
            }
        },
        ReturnValues: "ALL_NEW"
    }, callback);
};


module.exports = BaseModel.extend({}, {

    table: "Users",

    create: function(key, name, callback) {

        return clientDB.putItem({
            TableName: table,
            Item: {
                Id: {S: key},
                Name: {S: name}
            },
        }, callback);
    },

    addPlaces: function(key, restaurantList, callback) {

        callback = callback || _.noop();
        var self = this;

        this.getById(key, function(err, data){

            if (err) {
                callback(err, data);
                return ;
            }

            log.debug("Item fetched", pjson(data));
            var places = Obj.get(data, 'Item.Places.M', {});

            _.each(restaurantList, function(restaurant) {

                // Prevent empty restaurant name input
                restaurant = restaurant || "";
                restaurant = restaurant.trim().toLowerCase();

                if (restaurant.length == 0){
                    return;
                }

                var newId = shortid.generate();
                log.debug("Restaurant short ID= ", newId);
                places[newId] = {S: restaurant};
            });

            updatePlaces.call(self, key, places, callback);

        });
    },

    addPlace: function(key, restaurant, callback) {
        this.addPlaces(key, [restaurant], callback);
    },

    removeByPlaceName: function (key, restName, callback) {

        callback = callback || _.noop();
        restName = restName.trim().toLowerCase();
        var self = this;

        this.getById(key, function(err, data){

            if (err) {
                callback(err, data);
                return ;
            }

            log.debug("Item fetched", pjson(data));
            var places = Obj.get(data, 'Item.Places.M', {});

            for (var idx in places) {

                var placeName = Obj.get(places, idx+'.S');

                if (placeName == restName) {
                    delete places[idx];
                }
            }

            updatePlaces.call(self, key, places, callback);

        });
    },

});