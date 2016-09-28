/**
 * Hello command test file
 */

require('rootpath')();

var assert = require('chai').assert;
var BaseCmd = require('src/command/Base.js');
var log = require('log4js').getLogger("src/command/Base.spec");
var CmdResponse = require("src/core/CommandResponse.js");
var CmdError = require('src/error/CommandError.js');


/**
 * @class UnhandledErrorCmd
 */
var CmdA = BaseCmd.extend({

    run: function() {
        throw new CmdError("Don't run me!!");
    }
});

/**
 * @class RejectCmd
 */
var CmdB = BaseCmd.extend({

    run: function() {
        this.response.addAttachment({ text: 'B' });
        this.response.send("I'm not happy!!");
    }
});



describe("BaseCmd.spec", function (){

    var C1 = new CmdA();
    var C2 = new CmdA();
    var C3 = new CmdB();

    it("C1 response is CommandResponse", function() {
        assert.isTrue(C1.response instanceof CmdResponse);
    });

    it("C2 response is CommandResponse", function() {
        assert.isTrue(C2.response instanceof CmdResponse);
    });

    it("C3 response is CommandResponse", function() {
        assert.isTrue(C3.response instanceof CmdResponse);
    });

    it('C1 and C2 not are the same', function() {
        assert.isTrue(C1.response !== C2.response);
    });

    it('C3 and C2 not are the same', function() {
        assert.isTrue(C3.response !== C2.response);
    });


    it('C1 has one attachments ', function() {
        C1.response.addAttachment({ text: 'C1'});
        assert.isTrue(C1.response._attachments.length == 1);
        assert.isTrue(C1.response._attachments[0].text == 'C1');
    });

    it('C2 and C3 have no attachments ', function() {
        log.debug('C2 attachement=', C2.response._attachments);
        assert.isTrue(C2.response._attachments.length == 0);
        assert.isTrue(C3.response._attachments.length == 0);
    });

    it('C3 has one attachments ', function() {
        C3.response.addAttachment({ text: 'C3'});
        assert.isTrue(C3.response._attachments.length == 1);
        assert.isTrue(C3.response._attachments[0].text == 'C3');
    });

    it('C2 has no attachments ', function() {
        log.debug('C2 attachement=', C2.response._attachments);
        assert.isTrue(C2.response._attachments.length == 0);
    });

})