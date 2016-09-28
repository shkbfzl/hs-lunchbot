/**
 * Created by mohamed.kante on 9/24/16.
 */


require('rootpath')();

var Class = require('backbone-class');

module.exports = Class.extend({

    keyName: "default",

    initialize: function(){
        this._super();
    },

    parse: function(text) {

        throw new Error("You must implement the base Command parser");
    }
})