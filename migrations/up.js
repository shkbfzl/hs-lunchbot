/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var Boot = require('src/app/Boot.js');
var BaseModel = require('src/model/mongodb/Base');
var log = require('log4js').getLogger(__filename);
var async = require('async');


var logMsg = function(err){

    if (err) {
        log.error(err);
        return;
    }

    log.info("Table created");
};

Boot.ready(function(){

    async.waterfall([
        function(cb) {

            log.info("Creating 'Users' table");
            BaseModel.DB.createCollection('Users', function(e){
                logMsg(e);
                cb(null)
            });
        },
        function(cb) {
            log.info("Creating 'Sessions' table");
            BaseModel.DB.createCollection('Sessions', function(e){
                logMsg(e);
                cb(null)
            });
        }
    ], function(){

        BaseModel.DB.close();
    })

});

