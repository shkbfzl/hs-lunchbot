/**
 * Created by mohamed.kante on 9/19/16.
 */
var log = require("log4js").getLogger("config"),
    _ = require('underscore'),
    pretty_json = require('../src/util/pretty_json.js'),
    config,
    envConfig,
    env = process.env.LUNCHIO_ENV
    ;

/**
 * -------------------------------
 * FIX THIS after release!!!!
 */
if (process.env.LAMBDA_TASK_ROOT) {
    log.debug("Code running inside lambda switching to 'prod' env");
    env = 'prod';
}
//--------------------------------

log.debug("Loading default config file");
config = require(__dirname+"/default");

try{
    log.debug("Detecting LUNCHIO_ENV environment= "+env);
    envConfig = require(__dirname+"/"+env+".js");
}
catch(e){
    log.warn("Can't load config file, "+e);
    //log.warn(e);
}

config = _.extend(config, envConfig);

log.debug("Configuration file= \n"+pretty_json(config));

module.exports = config;
