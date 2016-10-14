
require('rootpath')();

var deferred = require('node-promise').defer();
var awc = require('async').waterfall;
var Log4Js = require('log4js');
var mongoCon = require('src/core/datasource/MongodbConnection.js');

Log4Js.configure({
    appenders: [
        {
            type: "console",
            layout: { type: "basic" }
        }
    ]
});

var log = Log4Js.getLogger(__filename);

awc([
    function(callback) {

        mongoCon.connect(callback);
    }
],
function(err) {

    if (err) {
        log.error("Boot failed");
        log.error(err);
        deferred.reject(err);
        return ;
    }

    log.info("Application initialized");
    deferred.resolve();
});

module.exports = {
    ready: function(callback) {

        deferred.then(callback);
    }
}