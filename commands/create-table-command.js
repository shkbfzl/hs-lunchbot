var AWS = require("aws-sdk");

AWS.config.loadFromPath('../server/config.json')
AWS.config.update({
  endpoint: "http://localhost:8081"
});

var docClient = new AWS.DynamoDB.DocumentClient();



function CreateTableCommand(context){
  this.context = context;
  this.commands = null;
}


CreateTableCommand.execute = function() {
    var params = {
        TableName : "Users",
        KeySchema: [       
            { AttributeName: "Name", KeyType: "HASH" }  //Partition key
        ],
        AttributeDefinitions: [       
            { AttributeName: "Name", AttributeType: "S" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 1, 
            WriteCapacityUnits: 1
        }
    };

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.log(JSON.stringify(err, null, 2));
        }
        else {
            console.log(JSON.stringify(data, null, 2));
        }
    });
};

module.exports = CreateTableCommand;

