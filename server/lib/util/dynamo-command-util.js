var AWS = require("aws-sdk");
var httpError = require("./http-error");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8081"
});

var docClient = new AWS.DynamoDB.DocumentClient();

function putRecord(params, callback) {
    console.log("Calling Put command.  Params:%s", JSON.stringify(params));
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to put item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        } else {
            console.log("PutItem succeeded:", JSON.stringify(data, null, 2));
            callback(null,data);
        }
    });
}

function getRecord(params, callback) {
    console.log("Calling Get command.  Params:%s", JSON.stringify(params));
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        } else {
            if (data && data.Item){
                console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
                callback(null,data);
            }
            else {
                console.error("GetItem did not return a record Item");
                callback(httpError.BAD_REQUEST);
            }
        }
    });
}

function updateRecord(params, callback) {
    console.log("Calling Update command.  Params:%s", JSON.stringify(params));
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            callback(null,data);
        }
    });
}

function deleteRecord(params, callback) {
    console.log("Calling Delete command.  Params:%s", JSON.stringify(params));
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        } else {
            if (data) {
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                callback(null,data);
            }
            else {
                console.error("Expected object back from Dynamo");
                callback(httpError.INTERNAL_SERVER_ERROR);
            }

        }
    });
}

module.exports = {
    putRecord: putRecord,
    getRecord: getRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord
};