import _ from 'lodash';

/**
 * Element-wise comparison of two arrays.
 *
 * Returns 1 if a is greater than b, -1 if a is less than b, or 0 if a and b
 * are equal. If the end of one of the arrays is reached the shorter array is
 * treated as being smaller.
 */
function arrayCompare(a, b) {
  for (var i = 0; i < a.length && i < b.length; i++) {
    var result = compare(a[i], b[i]);

    if (result !== 0) {
      return result;
    }
  }

  if (i < a.length) {
    return 1;
  } else if (i < b.length) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * Comparison of two variables.
 *
 * Returns 1 if a is greater than b, -1 if a is less than b, or 0 if a and b
 * are equal.
 */
function compare(a, b) {
  if (_.isArray(a) && _.isArray(b)) {
    return arrayCompare(a, b);
  } else if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}

export default compare;
