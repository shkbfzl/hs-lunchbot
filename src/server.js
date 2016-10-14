/**
 *
 * This is a development server
 */
require('rootpath')();

var log = require('log4js').getLogger('dev-server');
var BodyParser  = require('body-parser');
var server = require('express')();
var Config = require('config');
var Bot = require('src/core/Bot');
var Boot = require('src/app/Boot.js');
const PORT = Config.server.port;

//
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: false }));

server.post('/bot', function(req, resp) {
    log.debug(req.body);
    Bot.run(req.body, {}, function(error, data){

        resp.send(data);
    });

});


log.info("Starting LUNCHIO server");
log.info("Listing on port: "+PORT);

Boot.ready(function(){

    server.listen(PORT, function(error) {

        if (error) {
            log.error("Oops: "+error.message);
            log.error(error);
            return;
        }

        log.info("Api available on http://localhost:"+PORT+"/bot");
        log.info("Server ready ...");
    });
});
