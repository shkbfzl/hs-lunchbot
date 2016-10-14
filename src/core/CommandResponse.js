/**
 * Created by mohamed.kante on 9/20/16.
 */

require('rootpath')();

var Class = require('backbone-class');
var pretty_json = require('src/util/pretty_json');
var log = require('log4js').getLogger(__filename);
var _ = require('underscore');

const SEND_EVENT = 'send';
const ERROR_EVENT = 'error';

module.exports = Class.extend({

    // Private properties
    _attachments:[],

    public: false,

    initialize: function() {
        this._super();
        this._attachments = [];
    },

    addAttachment: function(attement){

        if (!attement) {
            return this;
        }

        this._attachments.push(attement);

        return this;
    },

    send: function(text){

        var data = this.buildResponse(text);
        log.debug("Response data= ", data);
        this.trigger(SEND_EVENT, data);
    },

    error: function(exception){

        this.trigger(ERROR_EVENT, exception);
    },

    done:function() {
        this.send('');
    },

    buildResponse: function(text) {

        var data = {
            text: text,
        };

        if (!_.isEmpty(this._attachments)) {
            data.attachments = this._attachments;
        }

        if (this.public) {
            data.response_type = 'in_channel';
        }

        return data ;
    },

    onSend: function(callback) {

        callback = callback || _.noop;

        this.on(SEND_EVENT, callback.bind(this));
        return this;
    },

    onError: function(callback) {

        callback = callback || _.noop;

        this.on(ERROR_EVENT, callback.bind(this));
        return this;
    },

    toString: function(){
        var map = {
            public: this.public,
            attachments: this.attachments,
        };
        return pretty_json(map);
    }
});
