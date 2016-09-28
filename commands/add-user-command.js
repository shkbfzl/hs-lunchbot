var AWS = require("aws-sdk");

AWS.config.loadFromPath('../server/config.json')
AWS.config.update({
endpoint: "http://localhost:8081"
});

var docClient = new AWS.DynamoDB.DocumentClient();

function AddUserCommand(context){
  this.context = context;
  this.commands = null;
}


AddUserCommand.execute = function() {
var params = {
    "TableName": "Users",
    "Item": {
        "Name":"Pragati Upadhyay",
       "Places": [
            { "Id": 1, "Name": "Chipotle" },
            { "Id": 2, "Name": "Peperi" },
            { "Id": 3, "Name": "Anthem" },
            { "Id": 4, "Name": "Clark's" },
            { "Id": 5, "Name": "Guru" }
        ],
        "Choices": [
            { "Id": 1 },
            { "Id": 2 },
            { "Id": 5 }
        ],
        "Banned": [
            { "Id": 3 },
            { "Id": 4 }
        ],
        "History": [
            { "Id": 2, "Date": "2016-09-13" },
            { "Id": 5, "Date": "2016-09-12" }
        ],
        "LastModified": "2016-09-13"
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }

});

};

module.exports = AddUserCommand;

