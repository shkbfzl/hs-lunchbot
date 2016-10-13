/**
 * Created by mohamed.kante on 9/26/16.
 */


require('rootpath')();

var log = require('log4js').getLogger(__filename);
var _ = require('underscore');
var BaseModel = require('src/model/mongodb/Base.js');
var shortid = require('shortid');
var pjson = require('src/util/pretty_json');
var Obj = require("object-path");
var trimlow = require('src/util/trimlow_text.js');
var UnknowRestaurantError = require('src/error/UnknowRestaurantError.js');


/**
 *
 * @param places
 * @returns {*}
 */
var getRestaurantId = function(placeList, placeName) {

    var placeId = null;
    for (var idx in placeList) {

        var itemName = Obj.get(placeList, idx);
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

        this.collection().insert({
            _id: key,
            name: name
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
            var places = Obj.get(data, 'places', {});

            _.each(restaurantList, function(restaurant) {

                // Prevent empty restaurant name input
                restaurant = trimlow(restaurant);

                if (restaurant.length == 0){
                    return;
                }

                var newId = shortid.generate();
                log.debug("Restaurant short ID= ", newId);
                places[newId] = restaurant;
            });

            self.update(key, { places: places }, callback);
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
            var places = Obj.get(data, 'places', {});

            for (var idx in places) {

                var placeName = places[idx];

                if (placeName == restName) {
                    delete places[idx];
                }
            }

            self.update(key, { places: places }, callback);

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
            var placeList = Obj.get(data, 'places', {});
            var bannedList = Obj.get(data, 'banned', []);

            var placeId = getRestaurantId(placeList, placeName);

            if (!placeId) {
                var errMsg = "Sorry, you don't have this restaurant in your list.";
                callback(new UnknowRestaurantError(errMsg), null);
                return;
            }

            bannedList.push(placeId);

            self.update(key, { banned: bannedList}, callback);
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
            var placeList = Obj.get(data, 'places', {});
            var bannedList = Obj.get(data, 'banned', []);

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

            bannedList = _.compact(bannedList);
            log.debug("Removing all falsy values= ", bannedList);

            self.update(key, { banned: bannedList}, callback);
        });

    },

});