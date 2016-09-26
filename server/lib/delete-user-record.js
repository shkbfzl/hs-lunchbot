var dynamoClient = require("./util/dynamo-command-util");

function deleteUserRecord(userId, callback) {
  var table = "Users";

  var params = {
      TableName:table,
      Key:{
          "Name":userId
      }
  };

  console.log("Attempting to delete User:%s from Table:%s...", userId, table);
  dynamoClient.deleteRecord(params, function(err, data) {
      if (err) {
          console.error("Unable to delete user record. Error JSON:", JSON.stringify(err, null, 2));
          callback(err);
      }
      else {
          console.log("DeleteUserRecord succeeded:", JSON.stringify(data, null, 2));
          callback(null,data);
      }
  });
}

module.exports = {
    deleteUserRecord: deleteUserRecord
};