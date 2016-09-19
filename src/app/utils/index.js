import angular from 'angular';

import {
  toRadioView,
  toRadioModel,
  wrapRadioOptions,
  toSelectModel,
  toSelectView,
  wrapSelectOptions
} from './wrap-options';
import {
  transformKeys,
  camelCaseKeys,
  snakeCaseKeys
} from './transform-keys';
import getValueAtPath from './get-value-at-path';
import flattenRelationships from './flatten-relationships';
import firstPromise from './first-promise';
import escapeRegExp from './escape-reg-exp';
import dateSearch from './date-search';
import anyValue from './any-value';

export default angular.module('radar.utils', [])
  .factory('toRadioView', toRadioView)
  .factory('toRadioModel', toRadioModel)
  .factory('wrapRadioOptions', wrapRadioOptions)
  .factory('toSelectModel', toSelectModel)
  .factory('toSelectView', toSelectView)
  .factory('wrapSelectOptions', wrapSelectOptions)
  .factory('transformKeys', transformKeys)
  .factory('camelCaseKeys', camelCaseKeys)
  .factory('snakeCaseKeys', snakeCaseKeys)
  .factory('getValueAtPath', getValueAtPath)
  .factory('flattenRelationships', flattenRelationships)
  .factory('firstPromise', firstPromise)
  .factory('escapeRegExp', escapeRegExp)
  .factory('dateSearch', dateSearch)
  .factory('anyValue', anyValue)
  .name;
