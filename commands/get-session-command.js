var AWS = require("aws-sdk");

AWS.config.loadFromPath('../server/config.json')
AWS.config.update({
endpoint: "http://localhost:8081"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function GetSessionCommand(context){
  this.context = context;
  this.commands = null;
}

GetSessionCommand.execute = function(sessionId) {
console.log('SessionId:', sessionId);
var params = { 
    TableName: "Sessions",
    Key: {
        "Id": sessionId
    }
};
docClient.get(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data.Item.choices, null, 2));
});

}

module.exports = GetSessionCommand;

