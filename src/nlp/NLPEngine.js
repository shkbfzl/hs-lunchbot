/**
 * Created by mohamed.kante on 9/19/16.
 */

require('rootpath')();

var log = require("log4js").getLogger(__filename);
var pretty_json = require('src/util/pretty_json.js');
var Class = require('backbone-class');
var _ = require('underscore');
var NLPRouteIndexError = require('src/error/NLPMappingIndexError.js');
var NLPNotMatchError = require('src/error/NLPNotMatchError.js');
var CmdDescriptor = require('src/core/CommandDescriptor.js');

var botTrigger = "/lunchio";

module.exports = Class.extend({

    route: null,
    indexedMapping: {},

    context: {},

    initialize: function(route) {

        this.route = route;

        this.indexedMapping = this._buildMappingIndex();
    },

    _buildMappingIndex: function(){

        var index = {};

        log.debug("Indexing NLP mapping");

        if (!this.route) {
            throw new NLPRouteIndexError("NLP route is invalid");
        }

        _.each(this.route, function(params, cmdClass) {

            _.each (params.langs, function(lang){

                lang = (lang+"").toLowerCase().trim();
                index[lang] = {
                    parsers: params.parsers || [],
                    className: cmdClass
                };
            });
        });

        log.debug("NLP index = \n"+pretty_json(index))

        return index;
    },

    resolveCommand: function(text) {

        if (text) {
            text = text.replace(botTrigger, "").trim();
        }

        log.debug("Resolving language command descriptor");
        log.debug("Input text= |"+text+"|");

        var descriptor = null;

        for (var dialect in this.indexedMapping) {

            var pattern = "^"+dialect+"$";
            var regx = new RegExp(pattern, 'i');

            var params = this.indexedMapping[dialect];
            log.debug("Matching against: "+pattern)

            if (regx.test(text)) {

                log.debug("Dialect matched.")
                log.debug("Command class ---> "+params.className);
                descriptor = new CmdDescriptor();
                descriptor.dialectMatch = dialect;
                descriptor.mappedCommandName = params.className;
                descriptor.inputText = text;
                descriptor.parsers = params.parsers;
                break;
            }

        }

        if (!descriptor) {
            throw new NLPNotMatchError("Sorry, I didn't get that");
        }

        return descriptor;
    },

    process: function(text, callback) {

        callback = callback || _.noop;

        // For safety let's catch all unhandled error
        try{

            var descriptor = this.resolveCommand(text);

            var command = descriptor.createCommand(this.context);

            command.onDone(callback);

            command.run();
        }
        catch (e) {
            log.error(e);
            callback(e);
        }
    }

})