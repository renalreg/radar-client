import angular from 'angular';

import checkboxRequiredValidator from './checkbox-required-validator.directive';
import consentValidator from './consent-validator.directive';
import dateValidator from './date-validator.directive';
import emailValidator from './email-validator.directive';
import equalToValidator from './equal-to-validator.directive';
import integerValidator from './integer-validator.directive';
import numberValidator from './number-validator.directive';

export default angular.module('radar.validators', [])
  .directive('checkboxRequiredValidator', checkboxRequiredValidator)
  .directive('consentValidator', consentValidator)
  .directive('dateValidator', dateValidator)
  .directive('emailValidator', emailValidator)
  .directive('equalToValidator', equalToValidator)
  .directive('integerValidator', integerValidator)
  .directive('numberValidator', numberValidator)
  .name;
