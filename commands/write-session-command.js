

var AWS = require("aws-sdk");

AWS.config.loadFromPath('../server/config.json')
AWS.config.update({
  endpoint: "http://localhost:8081"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


function WriteSessionCommand(context){
  this.context = context;
  this.commands = null;
}


WriteSessionCommand.execute = function() {
var params = {
    TableName: "Sessions",
    Item: {
        "Id": "12345",
        "Users": [
            "JosiahWong", "Mr. Smith"
        ],
        "choices":[
          "Elephant and Castle",
          "Potbelly",
          "Cafe Boston"
        ],
        "notPicked":[
          {"JosiahWong": "Elephant and Castle"}
        ],
        "LastModified": "2016-09-12"
    }
};

docClient.put(params, function(err, data) {
    if (err)
        console.log(JSON.stringify(err, null, 2));
    else
        console.log(JSON.stringify(data, null, 2));
});


}

module.exports = WriteSessionCommand;