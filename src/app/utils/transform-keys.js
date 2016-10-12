import _ from 'lodash';

var constant = new RegExp('^[A-Z0-9_]+$');

/**
 * Transform an objects keys.
 *
 * @param {*} x - the value to transform.
 * @param {function} f - the transformation to apply to each key.
 * @returns {*} - the value with its keys transformed.
 */
function transformKeys(x, f) {
  if (_.isArray(x)) { // Array
    return _.map(x, function(value) {
      return transformKeys(value, f);
    });
  } else if (_.isObject(x)) { // Object
    return _.transform(x, function(result, value, key) {
      result[f(key)] = transformKeys(value, f);
    });
  } else { // Primitive
    return x;
  }
}

/**
 * Convert an object's keys to camel case.
 *
 * @param {*} x - the value to transform.
 * @returns {*} - the value with its keys camel cased.
 */
function camelCaseKeys(x) {
  return transformKeys(x, function(key) {
    if (constant.exec(key)) {
      return key;
    } else {
      return _.camelCase(key);
    }
  });
}

/**
 * Convert an object's keys to snake case.
 *
 * @param {*} x - the value to transform.
 * @returns {*} - the value with its keys snake cased.
 */
function snakeCaseKeys(x) {
  return transformKeys(x, function(key) {
    if (constant.exec(key)) {
      return key;
    } else {
      return _.snakeCase(key);
    }
  });
}

export {
  transformKeys,
  camelCaseKeys,
  snakeCaseKeys
};
