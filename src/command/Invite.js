/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');
var User = require('src/model/dynamodb/User.js');
var _ = require('underscore');

module.exports = BaseCmd.extend({

    name: "invite",
    description: "invite people",

    initialize: function(){
        this._super();
    },

    run: function() {

        var texts = [
            'That’s a solid crew you’ve assembled there.',
            'I sent your invitation.'
        ];

        var randId = _.random(0,1);
        this.response.send(texts[randId]);
    }
});

