//
//
//

require('rootpath')();
var log = require('log4js').getLogger('Lamda');
var NLPEngine = require('src/nlp/NLPEngine.js');
var nlpMapping = require('src/nlp/NLPMapping.js');
var _ = require("underscore");

exports.run = function (params, ctx, callback) {

    callback = callback || _.noop;

    var engine,
        message = params.text;

    engine = new NLPEngine(nlpMapping);
    engine.context = params; // TODO Hmmm, weird find better way

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
