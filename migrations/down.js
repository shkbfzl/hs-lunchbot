/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

require('rootpath')();

var Boot = require('src/app/Boot.js');
var BaseModel = require('src/model/mongodb/Base');
var async = require('async');
var log = require('log4js').getLogger(__filename);

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

            log.info("Deleting 'Users' table");
            BaseModel.DB.dropCollection('Users', function(e){
                logMsg(e);
                cb(null)
            });
        },
        function(cb) {
            log.info("Deleting 'Sessions' table");
            BaseModel.DB.dropCollection('Sessions', function(e){
                logMsg(e);
                cb(null)
            });
        }
    ], function(){

        BaseModel.DB.close();
    })
});

