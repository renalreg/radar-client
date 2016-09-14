import angular from 'angular';

import fatalError from './fatal-error.directive';

export default angular.module('radar.ui.fatalError', [])
  .directive('fatalError', fatalError)
  .name;
