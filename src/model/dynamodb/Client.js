/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var log = require('log4js').getLogger(__filename);
var Config = require('config');

log.debug("Creating Dynamodb connection");


var AWS = require('aws-sdk');

var params = {
    endpoint: new AWS.Endpoint(Config.dynamedb.host),
    accessKeyId: Config.dynamedb.key,
    secretAccessKey: Config.dynamedb.secret,
    region: Config.dynamedb.region,
};

if (Config.env == 'production'){
    delete params.endpoint;
}

var connection = new AWS.DynamoDB(params);

module.exports = connection;
