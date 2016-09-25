/**
 *
 *
 */
require('rootpath')();


var assert = require('chai').assert;
var log = require('log4js').getLogger('CommandResponse.spec');
var CmdResponse = require('src/core/CommandResponse.js');

describe('CommandResponse', function(){

    it('Test private response', function(done) {

        var resp = new CmdResponse();
        var notCalledYet = true;

        resp.onSend(function(data){

            notCalledYet = false;
            assert.isTrue(!notCalledYet);

            log.info("callback data: ", data);
            assert.isTrue(data.text == 'ok');
            assert.isTrue(data.response_type == undefined);
            assert.isTrue(data.attachements == undefined);

            done();
        });

        assert.isTrue(notCalledYet);
        assert.isTrue(!resp.public);
        resp.send("ok");
    });

    it('Test public response', function(done) {

        var resp = new CmdResponse();
        resp.addAttachment({ text: "mango" })
            .addAttachment()
            .addAttachment(null)
            .addAttachment({ text: 'sushi' });
        resp.public = true;

        resp.onSend(function(data){

            var at1 = data.attachements[0].text;
            var at2 = data.attachements[1].text;

            log.info("callback data: ", data);
            assert.isTrue(data.text == 'cool');
            assert.isTrue(data.response_type == 'in_channel');
                assert.isTrue(data.attachements.length == 2);

            assert.isTrue(at1 == 'mango');
            assert.isTrue(at2 == 'sushi');
            done();
        });

        assert.isTrue(resp.public);
        resp.send("cool");
    });

})

