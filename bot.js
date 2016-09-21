//
//
//

require('rootpath')();

var NLPEngine = require('src/NLPEngine.js');
var log = require('log4js').getLogger('Lamda');
var nlpRoute = require('src/NLPRoute.js');


exports.handler = function (event, context, callback) {
    var engine,
        message = event.message;

    log.debug("----- BOT RUN -----");
    log.debug("Event= ", event);
    log.debug("Context= ", context);

    engine = new NLPEngine(nlpRoute);

    engine.process(message, function(error, result){

        var resultText = result;
        if (error) {
            //callback(error.message);
            //callback(null, {"text": error.message})
            resultText = error.message ;
        }

        log.debug("Error= "+error+", Response= "+result);
        callback(null, {"text": resultText})
    });
};
