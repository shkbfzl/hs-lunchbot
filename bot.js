//
//
//

require('rootpath')();

var NLPEngine = require('src/NLPEngine.js');
var log = require('log4js').getLogger('Lamda');
var nlpMapping = require('src/NLPMapping.js');


exports.handler = function (event, context, callback) {
    var engine,
        message = event.text;

    log.debug("----- BOT RUN -----");
    log.debug("Event= ", event);
    log.debug("Context= ", context);

    engine = new NLPEngine(nlpMapping);
    engine.context = event;

    engine.process(message, function(error, result){

        var resultText = result;
        if (error) {

            resultText = error.message ;
            log.warn(resultText);
        }

        log.debug("Error= "+error+", Response= "+result);
        callback(null, {"text": resultText})
    });
};
