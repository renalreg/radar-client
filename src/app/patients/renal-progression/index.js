import angular from 'angular';

import {
  renalProgressionPermissionFactory,
  renalProgressionControllerFactory,
  renalProgressionComponent
} from './renal-progression-component.directive';

import templateUrl from './renal-progression.html';

function config($stateProvider) {
  $stateProvider.state('patient.renalProgression', {
    url: '/renal-progression',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.renalProgression', [])
  .config(config)
  .factory('RenalProgressionPermission', renalProgressionPermissionFactory)
  .factory('RenalProgressionController', renalProgressionControllerFactory)
  .directive('renalProgressionComponent', renalProgressionComponent)
  .name;
