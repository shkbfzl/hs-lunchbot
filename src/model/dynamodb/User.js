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
var UnknowRestaurantError = require('src/error/UnknowRestaurantError.js');

var table = "Users";

/**
 *
 * @param key
 * @param places
 * @param callback
 */
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

/**
 *
 * @param key
 * @param banList
 * @param callback
 */
var updateBanList= function(key, banList, callback) {

    log.debug("New banned list: ", banList);

    this.DB.updateItem({
        TableName: this.table,
        Key: {
            Id: { S: key }
        },
        AttributeUpdates: {
            Banned: {
                Action: 'PUT',
                Value: { SS: banList }
            }
        },
        ReturnValues: "ALL_NEW"
    }, callback);
};

/**
 *
 * @param places
 * @returns {*}
 */
var getRestaurantId = function(placeList, placeName) {

    var placeId = null;
    for (var idx in placeList) {

        var itemName = Obj.get(placeList, idx+'.S');
        log.debug("id=", idx, ", name=", itemName, ", place=", placeName);

        if (itemName == placeName) {
            placeId = idx;
            break;
        }
    }

    return placeId;
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
                restaurant = trimlow(restaurant);

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
        restName = trimlow(restName);
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

    addToBannedList: function(key, placeName, callback) {

        callback = callback || _.noop();
        placeName = trimlow(placeName);
        var self = this;

        this.getById(key, function(err, data) {

            if (err) {
                callback(err, data);
                return;
            }

            log.debug("Item fetched", pjson(data));
            var placeList = Obj.get(data, 'Item.Places.M', {});
            var bannedList = Obj.get(data, 'Item.Banned.SS', []);

            var placeId = getRestaurantId(placeList, placeName);

            if (!placeId) {
                var errMsg = "Sorry, you don't have this restaurant in your list.";
                callback(new UnknowRestaurantError(errMsg), null);
                return;
            }

            bannedList.push(placeId);

            updateBanList.call(self, key, bannedList, callback);
        });

    },

    removeFromBannedList: function(key, placeName, callback) {

        callback = callback || _.noop();
        placeName = trimlow(placeName);
        var self = this;

        this.getById(key, function(err, data) {

            if (err) {
                callback(err, data);
                return;
            }

            log.debug("Item fetched", pjson(data));
            var placeList = Obj.get(data, 'Item.Places.M', {});
            var bannedList = Obj.get(data, 'Item.Banned.SS', []);

            var placeId = getRestaurantId(placeList, placeName);

            if (!placeId) {
                var errMsg = "Sorry, you don't have this restaurant in your list.";
                callback(new UnknowRestaurantError(errMsg), null);
                return;
            }

            for(var idx in bannedList) {

                var bannedId = bannedList[idx];

                if (placeId == bannedId) {
                    delete bannedList[idx];
                }
            }

            updateBanList.call(self, key, bannedList, callback);
        });

    },

});