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

    log.info("Table created");
    log.info(data);
};

var userTable = {
    TableName : "Users",
    KeySchema: [
        { AttributeName: "Id", KeyType: "HASH" }
    ],
    AttributeDefinitions: [
        { AttributeName: "Id", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

var sessionTable = {
    TableName : "Sessions",
    KeySchema: [
        { AttributeName: "Id", KeyType: "HASH" }  //Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: "Id", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

log.info("Creating 'Users' table");
DClient.createTable(userTable, callback);

log.info("Creating 'Sessions' table");

DClient.createTable(sessionTable, callback);
