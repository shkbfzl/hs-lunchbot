/**
 * Created by mohamed.kante on 9/20/16.
 */

require('rootpath')();

var Class = require('backbone-class');

module.exports = Class.extend({

    dialectMatch: null,
    mappedCommandName: null,
    inputText: null,

    createCommand: function() {

        // Under development

        /*

        Make command is an instance of BaseCommand

        if (!(command instanceof BaseCommand)) {
            throw new CommandError("Invalid command "+descriptor);
        }
        */
    }
});
