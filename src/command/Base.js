/**
 * Created by mohamed.kante on 9/19/16.
 */

require('rootpath')();

var Class = require('backbone-class');

module.exports = Class.extend({

    name: null,
    description: null,

    initialize: function(){
        this._super();
    },

    run: function() {

        throw new Error('You must override this method');
    },

    toString: function() {
        var obj = {
            name: this.name,
            description: this.name,
        }
        return obj
    }
})
