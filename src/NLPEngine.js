/**
 * Created by mohamed.kante on 9/19/16.
 */

require('rootpath')();

var log = require("log4js").getLogger(__filename);
var Config = require("config");
var BaseCommand = require('src/command/Base.js');
var Class = require('backbone-class');


module.exports = Class.extend({

    route: null,

    initialize: function(route) {

        this.routes = route;
    },

    buildRouteIndex: function(){

        log.debug("Index route");
    },

    resolveCommand: function(index, text) {
        // Return command descriptor
    },

    process: function(text) {

        var indexedRoute = this.buildRouteIndex();
        var descriptor = this.resolveCommand(indexedRoute, text);
        var command = descriptor.getCommand();

        if (descriptor instanceof BaseCommand) {
            throw new CommandError("Invalid command "+descriptor);
        }

        return command.run() ;
    }

})