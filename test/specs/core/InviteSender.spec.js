/**
 *
 *
 */
require('rootpath')();


var assert = require('chai').assert;
var log = require('log4js').getLogger('InviteSender.spec');
var UserModel = require('src/model/mongodb/User.js');
var aw = require('async').waterfall;
var Boot = require('src/app/Boot');
var Config = require('config');
var InviteSenderMock = require('test/specs/core/InviteSenderMock.js');
var Auth = require('src/core/Auth.js');


describe('InviteSender', function(){

    beforeEach(function(done){
        Boot.ready(done);
    });

    it("Send invite", function(done) {

        var mock = new InviteSenderMock(),
            userId = '@moh',
            defr
            ;

        mock.uniqId = 'p111111';
        defr =  mock.invite(userId);

        var URL = Config.inviteFeedbackUrl+'/invites/'+
            mock.uniqId+'/feedback';

        defr.then(function(data) {
            log.debug("Response = ", data);

            var attchmnts = data.attachments;
            assert.isTrue(data.text.indexOf('colleague send') > 0);
            assert.isTrue(attchmnts[0].callback_id == URL);
            assert.isTrue(attchmnts[0].actions.length == 2);

            done();
        });

    });

})

