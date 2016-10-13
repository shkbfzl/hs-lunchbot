//
//
//

require('rootpath')();
var log = require('log4js').getLogger('Lamda');
var qs = require('qs');
var config = require('config');
var Bot = require('src/core/Bot');

exports.handler = function (event, context, callback) {

    log.debug("----- BOT RUN -----");
    log.debug("Event= ", event);
    log.debug("Context= ", context);
    log.debug("Default Env= ", process.env);


    log.debug("Running config= ", config);

    // We need this fix query string by AWS gateway
    event = (typeof event == "string")? qs.parse(event) : event;
    log.debug("Decoded event= ", event);

    Bot.run(event);
};
