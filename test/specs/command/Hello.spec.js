/**
 * Hello command test file
 */
var assert = require('chai').assert;
var log = require('log4js').getLogger("Hello.spec");


describe("command/Hello", function (){

    it("Greeting", function() {

        log.info("Welcome to lunch Bot");

    });

})