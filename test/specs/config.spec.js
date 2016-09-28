/**
 *
 *
 */
require('rootpath')();


var assert = require('chai').assert;
var Config = require('config');
var log = require('log4js').getLogger('Config.spec');

describe('config', function(){

    it('Test default config', function() {

        assert.isTrue(Config.hasOwnProperty('env'));

    })
})

