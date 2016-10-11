import _ from 'lodash';

var constant = new RegExp('^[A-Z0-9_]+$');

function transformKeys(x, f) {
  if (_.isArray(x)) {
    return _.map(x, function(value) {
      return transformKeys(value, f);
    });
  } else if (_.isObject(x)) {
    return _.transform(x, function(result, value, key) {
      result[f(key)] = transformKeys(value, f);
    });
  } else {
    return x;
  }
}

function camelCaseKeys(x) {
  return transformKeys(x, function(key) {
    if (constant.exec(key)) {
      return key;
    } else {
      return _.camelCase(key);
    }
  });
}

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
