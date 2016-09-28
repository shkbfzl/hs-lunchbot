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
                text: "- Cosi\n- Monicas\n- Al's pizza",
            })
            .addAttachment({
                title: "Banned places.",
                mrkdwn_in: [
                    "text"
                ],
                text: "- Chipotle\n- Genes\n- White rite",
            })
            .send("Here is your list.");
    }
});

