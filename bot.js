//
//
//

require('rootpath')();

var NLPEngine = require('src/NLPEngine.js');
var log = require('log4js').getLogger('Lamda');
var nlpRoute = require('src/NLPRoute.js');


exports.handler = function (event, context, callback) {
    var engine,
        text;

    log.debug("----- BOT RUN -----");
    log.debug("Event= ", event);
    log.debug("Context= ", context);

    engine = new NLPEngine(nlpRoute);

    engine.process(text, function(error, result){

        if (error) {
            callback(error);
            return;
        }

        log.debug("Response= "+result);
        callback(null, {"text": result})
    });
};
