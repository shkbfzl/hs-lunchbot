/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');
var _ = require('underscore');

module.exports = BaseCmd.extend({

    name: "hello",
    description: "Being nice",

    initialize: function(){
        this._super();
    },

    run: function() {

        var texts = [
            "I don't like that place too much either.",
            "I feel the same."
        ];
        var randId= _.random(0, 1);

        this.response.send(texts[randId]);
    }
});

