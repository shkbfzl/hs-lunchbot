'use strict'

/**
*
* Bot launcher script
*
*/
var lunchbot = require('../module/lunchbot');

/**
 * Environment variables used to configure the bot:
 *
 *  BOT_API_KEY : the authentication token to allow the bot to connect to your slack organization. You can get your
 *      token at the following url: https://homesitelab.slack.com/services/new/bot
 *  BOT_DB_PATH: the path of the SQLite database used by the bot
 *  BOT_NAME: the username you want to give to the bot within your organisation.
 */
var token = process.env.BOT_API_KEY || '';
var dbpath = process.env.BOT_DB_PATH  || 'http://localhost:8081/shell';
var name = 'foodbot';

var lunchbot = new lunchbot({
	token:token,
	dbPath: dbpath,
	name: name
});

lunchbot.run();