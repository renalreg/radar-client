import angular from 'angular';

import ageFormatFilter from './age-format.filter';
import dateFormatFilter from './date-format.filter';
import dateTimeFormatFilter from './date-time-format.filter';
import missingFilter from './missing.filter';
import unsafeFilter from './unsafe.filter';
import weeksAndDaysFormatFilter from './weeks-and-days-format.filter';

export default angular.module('radar.filters', [])
  .filter('ageFormat', ageFormatFilter)
  .filter('dateFormat', dateFormatFilter)
  .filter('dateTimeFormat', dateTimeFormatFilter)
  .filter('missing', missingFilter)
  .filter('unsafe', unsafeFilter)
  .filter('weeksAndDaysFormat', weeksAndDaysFormatFilter)
  .name;
