/**
 * MyList command test file
 */

require('rootpath')();

var assert = require('chai').assert;
var MyListCmd = require('src/command/MyList.js');
var BaseCmd = require('src/command/Base.js');
var log = require('log4js').getLogger(__filename);
var Boot = require('src/app/Boot');
var UserModel = require('src/model/mongodb/User');
var aw = require('async').waterfall;

var uID = "user1";

describe("command/MyList", function () {

    beforeEach(function(done){
        Boot.ready(done);
    });

    describe("getUserLists", function() {

        var userData1 = {
            places: {
                'p1': 'place A',
                'p2': 'place B',
                'p3': 'place C',
            },
            bans: ['p1', 'p4']
        };

        var userData2 = {
            places: [],
            bans: ['p1', 'p4']
        }

        it('Empty restaurants', function(){
            var cmd  = new MyListCmd();
            var resp = cmd.getUserLists(userData2);
            log.debug('resp= ', resp);
            assert.isTrue(resp.favorites.length == 0);
            assert.isTrue(resp.bans.length == 0);
        });

        it('Valid restaurants', function(){
            var cmd  = new MyListCmd();
            var resp = cmd.getUserLists(userData1);
            log.debug('resp= ', resp);
            assert.isTrue(resp.favorites.length == 2);
            assert.isTrue(resp.favorites[0] == 'place B');
            assert.isTrue(resp.favorites[1] == 'place C');

            assert.isTrue(resp.bans.length == 1);
            assert.isTrue(resp.bans[0] == 'place A');
        })
    });

    describe('setResponseAttachments', function(){

        var data1 = {
            favorites: ['place A', 'place B'],
            bans: [],
        };

        var data2 = {
            favorites: ['place A', 'place B'],
            bans: ['place C', 'place D'],
        };

        it('Test data 1', function(){
            var cmd  = new MyListCmd();
            cmd.setResponseAttachments(data1);
            var attachments = cmd.response.buildResponse().attachments;

            log.debug('Attachments = ', attachments);
            assert.isTrue(attachments[0].text.indexOf('place A') > 0);
            assert.isTrue(attachments[0].text.indexOf('place B') > 0);

            assert.isTrue(attachments[1].text.indexOf('no restaurant') > 0);
        });

        it('Test data 2', function(){
            var cmd  = new MyListCmd();
            cmd.setResponseAttachments(data2);
            var attachments = cmd.response.buildResponse().attachments;

            log.debug('Attachments = ', attachments);
            assert.isTrue(attachments[0].text.indexOf('place A') > 0);
            assert.isTrue(attachments[0].text.indexOf('place B') > 0);

            assert.isTrue(attachments[1].text.indexOf('place C') > 0);
            assert.isTrue(attachments[1].text.indexOf('place D') > 0);
        });
    });

    describe('Run sample command', function(){

        var data1 = {
            _id: 'U99991',
            name: 'User 1',
            places: {
                'p1': 'place A',
                'p2': 'place B',
                'p3': 'place C',
            },
            bans: ['p1', 'p4']
        };

        it('Integeration test', function(done){

            var mdb = UserModel.collection();

            aw([
                function(cb){

                    mdb.remove({_id: data1._id}, cb);
                },
                function(resp, cb) {
                    mdb.insert(data1, cb);
                },
                function(resp, cb){

                    var cmd  = new MyListCmd();
                    cmd.options.user_id = 'U99991';
                    cmd.onDone(cb);
                    cmd.run();
                }
            ], function(err, data) {
                log.debug("Error= ", err, ", data= ", data);

                assert.isTrue(!err);
                assert.isTrue(data.attachments.length == 2);
                assert.isTrue(data.attachments[0].text.indexOf('place B') > 0);
                assert.isTrue(data.attachments[0].text.indexOf('place C') > 0);

                assert.isTrue(data.attachments[1].text.indexOf('place A') > 0);
                done();
            })
        });

    })
})