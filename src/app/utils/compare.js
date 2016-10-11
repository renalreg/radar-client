import _ from 'lodash';

/**
 * Element-wise comparison of two arrays.
 *
 * Returns 1 if a is greater than b, -1 if a is less than b, or 0 if a and b
 * are equal. If the end of one of the arrays is reached the shorter array is
 * treated as being smaller.
 *
 * @param {array} a - first array.
 * @param {array} b - second array.
 * @returns {integer} - 1 if a > b, -1 if a < b, or 0 if a == b.
 */
function arrayCompare(a, b) {
  for (var i = 0; i < a.length && i < b.length; i++) {
    var result = compare(a[i], b[i]);

    if (result !== 0) {
      return result;
    }
  }

  if (i < a.length) { // a is longer than b
    return 1;
  } else if (i < b.length) { // a is shorter than b
    return -1;
  } else { // a and b are of equal length
    return 0;
  }
}

/**
 * Comparison of two variables.
 *
 * Returns 1 if a is greater than b, -1 if a is less than b, or 0 if a and b
 * are equal.
 *
 * @param {*} a - first value.
 * @param {*} b - second value.
 * @returns {integer} - 1 if a > b, -1 if a < b, or 0 if a == b.
 */
function compare(a, b) {
  if (_.isArray(a) && _.isArray(b)) {
    // Do an array comparison if a and b are array
    return arrayCompare(a, b);
  } else if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else { // a and b are equal
    return 0;
  }
}

export default compare;
