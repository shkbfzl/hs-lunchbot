//
//
//

require('rootpath')();

var NLPEngine = require('src/NLPEngine.js');
var log = require('log4js').getLogger('Lamda');
var nlpMapping = require('src/NLPMapping.js');
var qs = require('qs');
var Obj = require("object-path");


exports.handler = function (event, context, callback) {

    /**
     * FIX THIS after release!!!!
     */
    if (Obj.has(context, 'awsRequestId')){
        process.env.LUNCHIO_ENV = 'production';
    }

    log.debug("----- BOT RUN -----");
    log.debug("Event= ", event);
    log.debug("Context= ", context);

    // We need this fix query string by AWS gateway
    event = (typeof event == "string")? qs.parse(event) : event;
    log.debug("Decoded event= ", event);

    var engine,
        message = event.text;

    engine = new NLPEngine(nlpMapping);
    engine.context = event;

    engine.process(message, function(error, data){

        var response = data;
        if (error) {

            response = {
                text: error.message
                };
            log.warn(response);
        }

        log.debug("Error= "+error+", Response= ",response);
        callback(null, response)
    });
};
