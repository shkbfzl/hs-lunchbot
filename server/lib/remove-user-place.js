var dynamoClient = require("./util/dynamo-command-util");
var httpError = require("./util/http-error");

function removeUserPlace(userId, placeName, callback) {

    var table = "Users";

    var params = {
        TableName:table,
        Key:{
            "Name":userId
        }
    };

    console.log("Attempting to remove %s from %s...", placeName, userId);
    dynamoClient.getRecord(params, function(err, data) {
        if (err) {
            console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        }
        else {
            console.log("GetRecord succeeded:", JSON.stringify(data, null, 2));

            // Find the Place we are looking for
            if (data && data.Item && data.Item.Places) {
                var foundIndex = -1;
                for (var i = 0; i < data.Item.Places.length; i++) {
                    if (data.Item.Places[i].Name === placeName) {
                        foundIndex = i;
                        break;
                    }
                }
                if (foundIndex === -1) {
                    // Error
                    console.error("Unable to find place %s in user record places %s", placeName,
                        JSON.stringify(data.Item.Places));
                    callback(httpError.BAD_REQUEST);
                }
                else {
                    console.log("Found place at index %s", foundIndex);

                    // Prepare Update params
                    var updateParams = params;
                    updateParams.UpdateExpression = "REMOVE Places[" + foundIndex + "]";
                    updateParams.ReturnValues = "UPDATED_NEW";
                    console.log("Attempting to remove place with params %s", JSON.stringify(updateParams));
                    dynamoClient.updateRecord(updateParams, function(err, data){
                        if (err) {
                            console.error("Unable to remove place. Error JSON:", JSON.stringify(err, null, 2));
                            callback(err);
                        }
                        else {
                            console.log("RemoveUserPlace succeeded:", JSON.stringify(data,null,2));
                            callback(null, data);
                        }
                    });
                }
            }
            else {
                console.error("Places missing for Item:");
                callback(httpError.BAD_REQUEST);
            }

        }
    });
}

module.exports = {
    removeUserPlace: removeUserPlace
};