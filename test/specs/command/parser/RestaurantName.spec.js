

require('rootpath')();
var assert = require('chai').assert;
var log = require('log4js').getLogger("UserName.spec");
var RstNameParser = require('src/command/parser/RestaurantName.js');


describe("RestaurantName", function(){

    var text1 = "/lunchio add place dominos pizza ",
        text2 = "/lunchio add dominos pizza",
        text3 = "Can you remove place owesome restaurant",
        text4 = null,
        text5 = "/lunchio ban blue greek food",
        text6 = "/lunchio remove ban blue greek food",
        parser= new RstNameParser()
        ;

    it("Parser keyName = 'place'", function(){
        assert.isTrue(parser.keyName == "place");
    })

    it("Text1 restaurant name=dominose pizza", function(){
        var place = parser.parse(text1);
        assert.isTrue(place  == "dominos pizza");
    });

    it("Text2 restaurant name=null", function(){
        var place = parser.parse(text2);
        assert.isTrue(place  == null);
    });

    it("Text3 restaurant name=owesome restaurant", function(){

        var place = parser.parse(text3);
        assert.isTrue(place  == "owesome restaurant");
    });

    it("Text4 restaurant name=null", function(){
        var place = parser.parse(text4);
        assert.isTrue(place  == null);
    });

    it("Text5 restaurant name=blue greek food", function(){
        var place = parser.parse(text5);
        assert.isTrue(place  == 'blue greek food');
    });

    it("Text6 restaurant name=blue greek food", function(){
        var place = parser.parse(text6);
        assert.isTrue(place  == 'blue greek food');
    });

});