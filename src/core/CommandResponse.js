/**
 * Created by mohamed.kante on 9/20/16.
 */

require('rootpath')();

var Class = require('backbone-class');
var pretty_json = require('src/util/pretty_json');
var log = require('log4js').getLogger(__filename);
var deferred = require('node-promise').defer;
var _ = require('underscore');


module.exports = Class.extend({

    // Private properties
    _defr: null,
    _text: '',
    _attachements:[],

    public: false,

    initialize: function() {
        this.__attachements = [];
        this._defr = deferred();
    },

    attachText: function(message){

        this._attachements.push({
            text: message,
        });

        return this;
    },

    attachView: function(view, params) {
        /*
         * UNDER DEVELOPMENT
         */
        return this;
    },

    getDeferred: function() {
        return this._defr;
    },

    sendView: function(viewName, params) {
        /*
         * UNDER DEVELOPMENT
         */
    },

    send: function(text){

        var data = this.buildResponse(text);
        log.debug("Response data= ", data);
        this._defr.resolve(data);
    },

    done:function() {
        this.send('');
    },

    buildResponse: function(text) {

        var data = {
            text: text,
        };

        if (!_.isEmpty(this._attachements)) {
            data.attachements = this._attachements;
        }

        if (this.public) {
            data.response_type = 'in_channel';
        }

        return data ;
    },

    onSend: function(callback) {

        this._defr.then(callback);
    },

    toString: function(){
        var map = {
            public: this.public,
            attachements: this.attachements,
        };
        return pretty_json(map);
    }
});
