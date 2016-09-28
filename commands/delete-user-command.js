var AWS = require("aws-sdk");

AWS.config.loadFromPath('../server/config.json')
AWS.config.update({
  endpoint: "http://localhost:8081"
});

var docClient = new AWS.DynamoDB.DocumentClient();

function DeleteUserCommand(context){
  this.context = context;
  this.commands = null;
}

DeleteUserCommand.execute = function() {
var params = {
    TableName:"Users",
    Item:{
        "Name":"Josiah Wong"
    },
    UpdateExpression: "set Item.Places = :p, Item.Choices =:c", 
    ConditionExpression:{
    	":r": "Chipotle",
    	":c": 1
    }
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
 });
}

module.exports = DeleteUserCommand;