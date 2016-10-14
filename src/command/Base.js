/**
 * Created by mohamed.kante on 9/19/16.
 */

require('rootpath')();

var Class = require('backbone-class');
var prettyjson = require('src/util/pretty_json.js');
var CmdResponse = require('src/core/CommandResponse.js');
var deferred = require('node-promise').defer;
var _ = require('underscore');
var User = require('src/model/mongodb/User.js');
var Obj = require("object-path");

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
        this.response.onError(function(exception){
            self._defr.reject(exception);
        });
    },

    checkUser: function(callback){

        callback = callback || _.noop();
        var uId = this.options.user_id;
        var self  = this;

        User.keyExists(uId, function(bool){

            if (bool) {
                callback(data);
                return;
            }

            var msg = "Hmm, I don't know you yet. Add yourself to my list.";
            self.response.send(msg);
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

        callback = callback || _.noop;
        var self = this;

        this._defr
            .then(function(data){

                callback.call(this, null, data);
            },function (error){

                callback.call(this, error, null);
            });
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
