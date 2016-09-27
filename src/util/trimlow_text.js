/**
 * Created by mohamed.kante on 9/20/16.
 */

/**
 * Return pretty formated JSON
 *
 * @param object
 */
module.exports = function(text) {
    text = text || '';
    return text.trim().toLowerCase().replace(/\s+/g, ' ');
};
