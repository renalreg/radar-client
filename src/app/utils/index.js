import angular from 'angular';

import {
  toRadioView,
  toRadioModel,
  wrapRadioOptions,
  toSelectModel,
  toSelectView,
  wrapSelectOptions
} from './wrap-options';
import firstPromise from './first-promise';

export default angular.module('radar.utils', [])
  .factory('toRadioView', toRadioView)
  .factory('toRadioModel', toRadioModel)
  .factory('wrapRadioOptions', wrapRadioOptions)
  .factory('toSelectModel', toSelectModel)
  .factory('toSelectView', toSelectView)
  .factory('wrapSelectOptions', wrapSelectOptions)
  .factory('firstPromise', firstPromise)
  .name;
