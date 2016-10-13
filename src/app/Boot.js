
require('rootpath')();

var Config = require('config');
var deferred = require('node-promise').defer();
var awc = require('async').waterfall;
var Log4Js = require('log4js');
var mongoCon = require('src/core/datasource/MongodbConnection.js');

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