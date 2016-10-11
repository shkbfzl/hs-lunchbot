

var AWS = require("aws-sdk");

AWS.config.loadFromPath('../server/config.json')
AWS.config.update({
  endpoint: "http://localhost:8081"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();



function CreateSessionCommand(context){
  this.context = context;
  this.commands = null;
}


CreateSessionCommand.execute = function() {
var params = {
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

dynamodb.createTable(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});

}

module.exports = CreateSessionCommand;