/**
 * Created by mohamed.kante on 9/19/16.
 */
var log = require("log4js").getLogger("config"),
    _ = require('underscore'),
    pretty_json = require('../src/util/pretty_json.js'),
    config,
    envConfig,
    env = process.env.LUNCH_BOT_ENV
    ;

log.debug("Loading default config file");
config = require(__dirname+"/default");

try{
    log.debug("Detecting LUNCH_BOT_ENV environment= "+env);
    envConfig = require(__dirname+"/"+env+".js");
}
catch(e){
    log.warn("Can't load config file, "+e);
    //log.warn(e);
}

config = _.extend(config, envConfig);

log.debug("Configuration file= \n"+pretty_json(config));

module.exports = config;
