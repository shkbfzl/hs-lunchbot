/**
 * Created by mohamed.kante on 9/19/16.
 */

require('rootpath')();

var Error = require('extend-error');

module.exports = Error.extend('CommandError');
