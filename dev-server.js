/**
 *
 * This is a development server
 */
require('rootpath')();

var log = require('log4js').getLogger('dev-server');
var BodyParser  = require('body-parser');
var server = require('express')();
var Bot = require('bot');
const PORT = 50151;

//
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: false }));

server.post('/bot', function(req, resp) {
    console.log(req.body);
    Bot.handler(req.body, {}, function(error, data){

        resp.send(data);
    });

});


log.info("Starting LUNCHIO dev-server");
log.info("Listing on port: "+PORT);

server.listen(PORT, function(error) {

    if (error) {
        log.error("Oops: "+error.message);
        log.error(error);
        return;
    }

    log.info("Api available on http://localhost:"+PORT+"/bot");
    log.info("Server ready ...");
});