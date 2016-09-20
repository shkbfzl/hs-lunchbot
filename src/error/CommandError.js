/**
 * Created by mohamed.kante on 9/19/16.
 */


var CommandError = function () {
    Error.apply(this);
};

CommandError.prototype.constructor = CommandError;

CommandError.prototype = Object.create(Error);

module.exports = CommandError;
