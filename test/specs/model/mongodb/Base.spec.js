/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var assert = require('chai').assert;
var log = require('log4js').getLogger('model/mongodb/Base.spec');
var BaseModel = require('src/model/mongodb/Base.js');
var Boot = require('src/app/Boot.js');
var async = require('async');


var UserModel;

describe('Base model', function(){

    beforeEach(function(done){
        Boot.ready(function(){

            BaseModel.table = 'Users';
            UserModel = BaseModel.collection();
            done();
        });
    });

    describe('User collection test', function() {

        var UID = 1111 ;

        it("Drop user", function(done){

            UserModel.remove({ _id: UID }, function(err) {

                assert.isTrue( (!err)? true : false);
                done();
            })
        });

        it("Add user", function(done){

            UserModel.insert({ _id: UID, name: 'Mike' }, function(err) {

                assert.isTrue( (!err)? true : false);
                done();
            })
        });

        it("Get user", function(done){

            UserModel.findOne({ _id: UID}, function(err, data) {

                assert.isTrue( (!err)? true : false);
                assert.isTrue( data.name == 'Mike');
                done();
            })
        });
    });

});
