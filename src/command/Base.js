/**
 * Created by mohamed.kante on 9/19/16.
 */

require('rootpath')();

var Class = require('backbone-class');
var prettyjson = require('src/util/pretty_json.js');
var deferred = require('node-promise').defer;

module.exports = Class.extend({

    name: null,
    description: null,

    _descriptor: null,

    initialize: function(){
        this._super();
    },

    run: function(resolve, reject) {

        /*
         * ---------------------------------
         * Put all your command logic here
         * ---------------------------------
         */
        throw new Error('You must override this method');
    },

    handle: function() {

        var defr = deferred();

        try{

            this.run(defr.resolve, defr.reject);
        }
        catch (e) {
            defr.reject(e);
        }

        return defr;
    },

    setDescriptor: function(val) {
        this._descriptor = val;
    },

    getDescriptor: function() {
        return this._descriptor;
    },

    toString: function() {

        var obj = {
            name: this.name,
            description: this.name,
            slackContext: this.slackContext
        }
        return prettyjson(obj);
    }
})
