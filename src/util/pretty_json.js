/**
 * Created by mohamed.kante on 9/20/16.
 */

/**
 * Return pretty formated JSON
 *
 * @param object
 */
module.exports = function(object) {

    return JSON.stringify(object, null, '\t');
}
