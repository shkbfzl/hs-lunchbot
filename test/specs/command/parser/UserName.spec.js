

require('rootpath')();
var assert = require('chai').assert;
var log = require('log4js').getLogger("UserName.spec");
var UsrNameParser = require('src/command/parser/UserName.js');


describe("UserName", function(){

    var text1 = "@moh and @john are going to lunch",
        text2 = "No body is coming",
        text3 = "@sam is going for a Sushi",
        text4 = null,
        parser= new UsrNameParser()
        ;

    it("Parser keyName = 'users'", function(){
        assert.isTrue(parser.keyName == "users");
    })

    it("Text1 has 2 users", function(){

        var users = parser.parse(text1);
        assert.isTrue(users.length == 2);
        assert.isTrue(users[0] == "@moh");
        assert.isTrue(users[1] == "@john");
    });

    it("Text2 has no user", function(){

        var users = parser.parse(text2);
        assert.isTrue(users.length == 0);
    });

    it("Text3 has 1 user", function(){

        var users = parser.parse(text3);
        assert.isTrue(users.length == 1);
        assert.isTrue(users[0] == "@sam");
    });

    it("Text4 has no user", function(){

        var users = parser.parse(text4);
        assert.isTrue(users.length == 0);
    });

});