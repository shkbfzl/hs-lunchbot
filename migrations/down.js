/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var DClient = require('src/model/dynamodb/Client.js');
var log = require('log4js').getLogger(__filename);

var callback = function(err, data){

    if (err) {
        log.error(err);
        return;
    }

    log.info("Table deleted");
    log.info(data);
};

log.info("Deleting 'Users' table");
DClient.deleteTable({TableName: "Users"}, callback);

log.info("Deleting 'Sessions' table");
DClient.deleteTable({TableName: "Sessions"}, callback);
