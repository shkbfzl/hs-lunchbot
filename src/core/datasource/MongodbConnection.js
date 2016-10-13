/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var log = require('log4js').getLogger(__filename);
var Config = require('config');
var MongoClient = require('mongodb').MongoClient;
var BaseModel = require('src/model/mongodb/Base.js');
var _ = require('underscore');

var mogoConfig,
    uri
    ;

log.debug("Creating MongoDb connection with=", Config);
mogoConfig = Config.mongodb;
uri = mogoConfig.host+':'+mogoConfig.port+'/'+mogoConfig.database;
log.debug("MongoDb URI=", uri);


module.exports = {

    connect: function(callback) {

        callback = callback || _.noop;

        if (BaseModel.DB) {
            log.warn("DB already initialized");
            callback(null);
            return ;
        }

         MongoClient.connect(uri, function(err, db){

             if (err){
                 log.error("Ooop, mongodb connection failed ");
                 log.error(err);
                 callback(err);
                 return;
             }

             log.debug("Mongodb client connected");
             BaseModel.setDb(db);
             log.debug("Base model initialized");
             callback(null);
         });
     }
};
