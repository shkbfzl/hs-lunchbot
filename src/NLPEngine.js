/**
 * Created by mohamed.kante on 9/19/16.
 */

require('rootpath')();

var log = require("log4js").getLogger(__filename);
var pretty_json = require('src/util/pretty_json.js');
var Class = require('backbone-class');
var _ = require('underscore');
var NLPRouteIndexError = require('src/error/NLPRouteIndexError.js');
var NLPNotMatchError = require('src/error/NLPNotMatchError.js');
var CmdDescriptor = require('src/core/CommandDescriptor.js');

var botTrigger = "/lunchio";

module.exports = Class.extend({

    route: null,
    indexedRoute: {},

    context: {},

    initialize: function(route) {

        this.route = route;

        this.indexedRoute = this._buildRouteIndex();
    },

    _buildRouteIndex: function(){

        var index = {};

        log.debug("Indexing NLP route");

        if (!this.route) {
            throw new NLPRouteIndexError("NLP route is invalid");
        }

        _.each(this.route, function(phrases, commadClass) {

            _.each (phrases, function(lang){

                lang = (lang+"").toLowerCase().trim();
                index[lang] = commadClass;
            });
        });

        log.debug("NLP index = \n"+pretty_json(index))

        return index;
    },

    resolveCommand: function(text) {

        if (text) {
            text = text.replace(botTrigger, "").trim();
        }

        log.debug("Resolving language command descriptor")
        log.debug("Input text= |"+text+"|");

        var descriptor = null;

        for (var dialect in this.indexedRoute) {

            var pattern = "^"+dialect+"$";
            var regx = new RegExp(pattern, 'i');

            var cmdClass = this.indexedRoute[dialect];
            log.debug("Matching against: "+pattern)

            if (regx.test(text)) {

                log.debug("Dialect matched.")
                log.debug("Command class ---> "+cmdClass);
                descriptor = new CmdDescriptor();
                descriptor.dialectMatch = dialect;
                descriptor.mappedCommandName = cmdClass;
                descriptor.inputText = text;
                break;
            }

        }

        if (!descriptor) {
            throw new NLPNotMatchError("Sorry, I didn't get that");
        }

        return descriptor;
    },

    process: function(text, callback) {

        // For safety let's catch all unhandled error
        try{

            var descriptor = this.resolveCommand(text);

            var command = descriptor.createCommand();
            command.slackContext = this.context;

            command.handle()
                .then(function(result){

                    callback(null, result)

                },function(e){

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