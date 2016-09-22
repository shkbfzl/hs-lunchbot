/**
 * Created by mohamed.kante on 9/19/16.
 */
require('rootpath')();


var assert = require('chai').assert;
var NLPRouteIndexError = require('src/error/NLPRouteIndexError.js');
var NLPNotMatchError = require('src/error/NLPNotMatchError.js');
var log = require('log4js').getLogger('NLPEngine.spec');
var Engine = require('src/NLPEngine.js');

var dummyRoute = {
    'GoodFood': [
        "I\\s+want\\s+pizza",
        "I\\s+like\\s+sushi",
    ]
};

describe('NLPEngine', function(){

    it('Null route', function() {

        try{
            var engine = new Engine(null);
        }
        catch(e) {
            assert.isTrue(e instanceof NLPRouteIndexError);
        }
    })

    it('Test routes index', function() {

        var engine = new Engine(dummyRoute);
        var index = engine.indexedRoute;
        log.debug("Index = ", index);

        assert.isTrue(index["i\\s+want\\s+pizza"] == 'GoodFood');

        assert.isTrue(index["i\\s+like\\s+sushi"] == 'GoodFood');

    })

    describe('Test resolveCommand', function() {

        var text1 = "I   want more pizza",
            text2 = "I want tomato",
            text3 = "I want  piZza  ",
            text4 = "I  like sushi",
            text5 = "/lunchio I  like sushi",
            descriptor,
            engine = new Engine(dummyRoute);

        it('Empty text', function() {
            try{
                descriptor = engine.resolveCommand()
                assert.isTrue(false);
            }
            catch (e){
                assert.isTrue(e instanceof NLPNotMatchError);
            }
        });

        it('Test text1', function() {
            try{
                descriptor = engine.resolveCommand(text1)
                assert.isTrue(false);
            }
            catch (e){
                assert.isTrue(e instanceof NLPNotMatchError);
            }
        });

        it('Test text2', function() {
            try{
                descriptor = engine.resolveCommand(text2)
                assert.isTrue(false);
            }
            catch (e){
                assert.isTrue(e instanceof NLPNotMatchError);
            }
        });

        it('Test text3', function() {
            engine.resolveCommand(text3)
            assert.isTrue(true);
        });

        it('Test text4', function() {
            descriptor = engine.resolveCommand(text4)
            assert.isTrue(true);
        });

        it('Test text5', function() {
            descriptor = engine.resolveCommand(text5)
            assert.isTrue(true);
        });
    })
})



