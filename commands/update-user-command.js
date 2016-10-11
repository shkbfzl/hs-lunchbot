var AWS = require("aws-sdk");

AWS.config.loadFromPath('../server/config.json')
AWS.config.update({
  endpoint: "http://localhost:8081"
});

var docClient = new AWS.DynamoDB.DocumentClient();

function UpdateUserCommand(context){
  this.context = context;
  this.commands = null;
}

UpdateUserCommand.execute = function() {
var params = {
    TableName:"Users",
    
    UpdateExpression: "set Item.Names = :p",
    ExpressionAttributesValues: {
        "p" : "Pragati Upadhyay"
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Attempting a conditional update...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
 });
}

module.exports = UpdateUserCommand;