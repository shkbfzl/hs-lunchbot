'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');
var AWS = require("aws-sdk");
var createTableCommand = require('../commands/create-table-command');
var addUserCommand = require('../commands/add-user-command');
var updateUserCommand = require('../commands/update-user-command');
var deleteUserCommand = require('../commands/delete-user-command');


AWS.config.loadFromPath('../server/config.json')
AWS.config.update({
  endpoint: "http://localhost:8081/shell/"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Constructor function. It accepts a settings object which should contain the following keys:
 *      token : the API token of the bot (mandatory)
 *      name : the name of the bot
 *      dbPath : the path to access the database.
 *
 * @param {object} settings
 * @constructor
 *
 * 
 */
var LunchBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'foodbot';
    this.dbPath = settings.dbPath;
    this.db = null; 
    this.user = null;
    console.log(this.settings);
};

// inherits methods and properties from the Bot constructor
util.inherits(LunchBot, Bot);

/**
 * Run the bot
 * @public
 */
LunchBot.prototype.run = function () {
    this._onStart();
};

/**
 * On Start callback, called when the bot connects to the Slack server and access the channel
 * @private
 */
LunchBot.prototype._onStart = function () {
    //this._createTable();
    this._firstRunCheck();
};

LunchBot.prototype._createTable= function () {
    createTableCommand.execute();
}


/**
 * Check if the first time the bot is run. It's used to send a welcome message into the channel
 * @private
 */
LunchBot.prototype._firstRunCheck = function () {
	var self = this;
    console.log('first time user check');
    var params ={
        "TableName" : "Users",
        "Key": 
        { 
            "Name": "Josiah Wong" 
        }
    }
    docClient.get(params, function (err, data) {
        
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }

        // if user does not have any records
        if (data = {}) {
             self._welcomeMessage();
             console.log('adding the user');
             addUserCommand.execute();            
        }
        else {
          // updates with the existing user 
           updateUserCommand.execute();           
        }       
    });
};

/**
 * Sends a welcome message in the channel
 * @private
 */
LunchBot.prototype._welcomeMessage = function () {
    //this.postMessageToChannel(this.channels[0].name, 'Hello, Welcome to LunchBot',
        //{as_user: true});
};

module.exports = LunchBot;
