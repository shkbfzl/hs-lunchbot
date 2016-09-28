/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var log = require('log4js').getLogger(__filename);
var Config = require('config');



var AWS = require('aws-sdk');

log.debug("Creating Dynamodb connection with=", Config);

var connection = new AWS.DynamoDB({
    endpoint: new AWS.Endpoint(Config.dynamedb.host),
    accessKeyId: Config.dynamedb.key,
    secretAccessKey: Config.dynamedb.secret,
    region: Config.dynamedb.region,
});

module.exports = connection;
