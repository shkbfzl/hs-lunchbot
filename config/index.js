/**
 * Created by mohamed.kante on 9/19/16.
 */
var log = require("log4js").getLogger("config"),
    _ = require('underscore'),
    config,
    envConfig,
    env = process.env.HS_LUNCH_ENV
    ;

log.debug("Loading default config file");
config = require(__dirname+"/default");

try{
    log.debug("Detecting enviroment= "+env);
    envConfig = require(__dirname+"/"+env+".js");
}
catch(e){
    log.warn("Can't load config file: "+e.getMessage());
    log.warn(e);
}

config = _.extend(config, envConfig);

module.exports = config;
