/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var assert = require('chai').assert;
var log = require('log4js').getLogger("util/trimlow_text.spec");
var trimlow = require('src/util/trimlow_text.js');

describe("trimlow_text", function(){

    var text1 = " We like    to each late.  ";
    var text2 = "WHERE Is my   Lunch  ";
    var text3 = "yo, that to delicious";

    it("text1 == 'we like to each late.'", function(){
        var t1= trimlow(text1);
        log.info("trimlow = ["+t1+"]");
       assert.isTrue(t1== 'we like to each late.');
    });

    it("text2 == 'where is my lunch'", function(){
        var t2= trimlow(text2);
        log.info("trimlow = ["+t2+"]");
        assert.isTrue(t2 == 'where is my lunch');
    });

    it("text3 == 'yo, that to delicious'", function(){
        var t3 = trimlow(text3);
        log.info("trimlow = ["+t3+"]");
        assert.isTrue(t3 == 'yo, that to delicious');
    });

});