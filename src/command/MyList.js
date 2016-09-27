/**
 *
 *
 */
require('rootpath')();

var log = require('log4js').getLogger(__filename);
var BaseCmd = require('src/command/Base.js');


module.exports = BaseCmd.extend({

    name: "mylist",
    description: "Show my list",

    initialize: function(){
        this._super();
    },

    run: function() {

        this.response
            .addAttachment({
                title: "Favorite places.",
                mrkdwn_in: [
                    "text"
                ],
                text: "- Cosi\n- Pizza\n- Al's",
            })
            .addAttachment({
                title: "Banned places.",
                mrkdwn_in: [
                    "text"
                ],
                text: "- Golden Sushi\n- Burito express\n- White rite",
            })
            .send("Lunch.io is a tool that can" +
                " help your team choose a lunch " +
                "destination faster.");
    }
});

