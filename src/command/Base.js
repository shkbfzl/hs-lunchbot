/**
 * Created by mohamed.kante on 9/19/16.
 */

require('rootpath')();

var Class = require('backbone-class');
var prettyjson = require('src/util/pretty_json.js');
var CmdResponse = require('src/core/CommandResponse.js');
var deferred = require('node-promise').defer;

module.exports = Class.extend({

    name: null,
    description: null,
    response:null,

    _descriptor: null,
    _defr: null,

    initialize: function(){
        var self = this;
        this._super();

        this._defr = deferred();
        this.response = new CmdResponse();
        this.response.onSend(function(data){
            self._defr.resolve(data);
        });
    },

    run: function() {

        /*
         * ---------------------------------
         *  Put all your command logic here
         * ---------------------------------
         */
        throw new Error('You must override this method');
    },

    onDone: function(callback) {

        this._defr.then(callback.bind(this));
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
