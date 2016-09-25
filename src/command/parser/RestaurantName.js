/**
 * Created by mohamed.kante on 9/24/16.
 */


require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseParser = require('src/command/parser/BaseParser.js');
var _ = require('underscore');

module.exports = BaseParser.extend({

    keyName: "place",

    parse: function(text) {

        var restaurant = null,
            regs = [
                /add\s+place\s+(.*)+$/i,
                /remove\s+place\s+(.*)+$/i,
                /ban\s+(.*)+/i,
                /remove\s+ban\s+(.*)+/i
            ]
            ;

        if (!text) {
            log.debug("Empty text");
            return restaurant;
        }


        for (var index in regs){

            var reg = regs[index];

            if (!reg.test(text)) {
                continue;
            }

            log.debug("Regex matched= ", reg);
            var matches = reg.exec(text);
            log.debug("Parser pattern matches= ", matches);

            restaurant = matches[1] || null;
            break;
        }

        restaurant = (restaurant)? restaurant.trim() : null;
        log.debug("Restaurant name= ["+restaurant+"]");

        return restaurant;
    }

});