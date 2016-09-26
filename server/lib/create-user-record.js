var dynamoClient = require("./util/dynamo-command-util");

function createUserRecord(userData, callback) {
  var table = "Users";

  var params = {
      TableName:table,
      Item:userData
  };

  console.log("Attempting to create User:%s in Table:%s...", userData.Name, table);
  dynamoClient.putRecord(params, function(err, data) {
      if (err) {
          console.error("Unable to create user record. Error JSON:", JSON.stringify(err, null, 2));
          callback(err);
      }
      else {
          console.log("CreateUserRecord succeeded:", JSON.stringify(data, null, 2));
          callback(null,data);
      }
  });
}

module.exports = {
    createUserRecord: createUserRecord
};