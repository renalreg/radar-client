import _ from 'lodash';

/**
 * Returns true if the callback returns true for any value: object property,
 * array value, or primitive.
 *
 * @param {*} x - value to check.
 * @param {function} callback - function to determine if a value is a match.
 * @returns {boolean} - true if the callback returned true for one of the values.
 */
function anyValue(x, callback) {
  var found = false;
  var value;

  if (_.isArray(x)) { // Array
    // Recurse with each item
    for (var i = 0; i < x.length; i++) {
      value = x[i];
      found = anyValue(value, callback);

      if (found) {
        break;
      }
    }
  } else if (_.isObject(x)) { // Object
    // Recurse with each property
    for (var key in x) {
      if (x.hasOwnProperty(key)) {
        value = x[key];
        found = anyValue(value, callback);

        if (found) {
          break;
        }
      }
    }
  } else { // Primitive
    found = callback(x);
  }

  return found;
}

export default anyValue;
