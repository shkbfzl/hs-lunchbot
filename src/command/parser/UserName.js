/**
 * Created by mohamed.kante on 9/24/16.
 */


require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseParser = require('src/command/parser/BaseParser.js');

module.exports = BaseParser.extend({

    keyName: "users",

    parse: function(text) {

        var names = [],
            reg = /@(\w+)*/ig
            ;

        if (!text) {
            log.debug("Empty text");
            return names;
        }

        var names = text.match(reg);
        log.debug("Parser pattern matches= ", names);

        return names;
    }

});