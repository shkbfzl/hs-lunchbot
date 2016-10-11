/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var log = require('log4js').getLogger(__filename);
var Config = require('config');
var MogoClient = require('mongodb').MongoClient;

var mogoConfig,
    uri
    ;

log.debug("Creating MongoDb connection with=", Config);
mogoConfig = Config.get("mongodb")
uri = mogoConfig.host+':'+mogoConfig.port+'/'+mogoConfig.database;
log.debug("MongoDb URI=", uri);

MogoClient.connect(uri, function(err){

    if (err){
        log.error("Ooop, mongodb connection failed ");
        log.error(err);
        return;
    }

    log.debug("Mongodb client connected");
});

module.exports = MogoClient;
