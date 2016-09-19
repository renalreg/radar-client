import _ from 'lodash';

function transformKeys() {
  return function transformKeys(x, f) {
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
  };
}

function camelCaseKeys(transformKeys) {
  var re = new RegExp('^[A-Z0-9_]+$');

  return function camelCaseKeys(x) {
    return transformKeys(x, function(key) {
      if (re.exec(key)) {
        return key;
      } else {
        return _.camelCase(key);
      }
    });
  };
}

camelCaseKeys.$inject = ['transformKeys'];

function snakeCaseKeys(transformKeys) {
  var re = new RegExp('^[A-Z0-9_]+$');

  return function snakeCaseKeys(x) {
    return transformKeys(x, function(key) {
      if (re.exec(key)) {
        return key;
      } else {
        return _.snakeCase(key);
      }
    });
  };
}

snakeCaseKeys.$inject = ['transformKeys'];

export {
  transformKeys,
  camelCaseKeys,
  snakeCaseKeys
};
