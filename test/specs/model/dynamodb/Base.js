/**
 * Created by mohamed.kante on 9/26/16.
 */

require('rootpath')();

var assert = require('chai').assert;
var log = require('log4js').getLogger('model/dynamodb/Base.spec');
var BaseModel = require('src/model/dynamodb/Base.js');

describe('Base model', function(){

    describe('Normalize data', function() {
        var data = {
            Item: {
                Id: { S: 'user100' },
                Name: { S: 'Mike' },
                Places: { SS: ["A", "B", "C"]},
                Count: {N: "4444" },
                Tools: {M: {
                    One: {S: "pen"},
                    Two: {S: "ruler"},
                }},
            },
        };

        var normData = BaseModel.normalizeItem(data.Item);

        log.debug(normData);
        it("Id == user100", function(){
            assert.isTrue(normData.Id == data.Item.Id.S);
        });

        it("Name == Mike", function(){
            assert.isTrue(normData.Name == data.Item.Name.S);
        });

        it("Places == [A,B,C]", function(){
            assert.isTrue(normData.Places == data.Item.Places.SS);
        });

        it("Count == 4444", function(){
            assert.isTrue(normData.Count == data.Item.Count.N);
        });

        it("Tools has pen, ruler", function(){
            assert.isTrue(normData.Tools.One == data.Item.Tools.M.One.S);
            assert.isTrue(normData.Tools.Two == data.Item.Tools.M.Two.S);
        });

    });

});
