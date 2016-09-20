/**
 * Created by mohamed.kante on 9/19/16.
 */

require('rootpath')();

var log = require("log4js").getLogger(__filename);
var Config = require("config");
var BaseCommand = require('src/command/Base.js');
var CmdDescriptor = require('src/core/CommandDescriptor.js');
var Class = require('backbone-class');

module.exports = Class.extend({

    route: null,

    initialize: function(route) {

        this.route = route;
    },

    buildRouteIndex: function(){

        log.debug("Index route");
    },

    resolveCommand: function(index, text) {
        // Return command descriptor
        // new CmdDescriptor()
    },

    process: function(text, callback) {

        // For safety let's catch all unhandled error
        try{

            var indexedRoute = this.buildRouteIndex();
            var descriptor = this.resolveCommand(indexedRoute, text);
            var command = descriptor.createCommand();

            command.handle()
                .then(function(result){

                    callback(null, result)
                })
                .fail(function(e){

                    log.error(e);
                    callback(e)
                })
        }
        catch (e) {
            log.error(e);
            callback(e);
        }
    }

})