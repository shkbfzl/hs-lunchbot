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

        var jokes = [
            'A cold Mexican lunch is a buurrrrrito and chilli.',
            'Spaghetti is the smartest food because it always uses it’s noodle.'
        ];

        var randId = _.random(0, jokes.length - 1);

        this.response.send(jokes[randId]);
    }
});

