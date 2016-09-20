/**
 * Created by mohamed.kante on 9/19/16.
 */
require('rootpath')();


var assert = require('chai').assert;
var Config = require('config');
var log = require('log4js').getLogger('NLPEngine.spec');
var Engine = require('src/NLPEngine.js');

describe('NLPEngine', function(){

    it('Route should load', function() {

        var engine = new Engine();
        // Under development
        assert.isTrue(true);

    })
})



