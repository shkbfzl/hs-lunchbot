/**
 * Created by mohamed.kante on 10/16/16.
 */

require('rootpath')();

var InviteSender = require('src/core/InviteSender.js');
var log = require('log4js').getLogger(__filename);
var _ = require('underscore');
var Config = require('config');
var deferred = require('node-promise').defer;

module.exports = InviteSender.extend({

    successReponse: true,

    /**
     * @Override
     *
     * @param data
     * @returns {*}
     */
    postData: function(data) {

        var defr = deferred();

        if (this.successReponse) {
            defr.resolve(data);
        }
        else {
            defr.reject(data);
        }

        return defr;
    }
});