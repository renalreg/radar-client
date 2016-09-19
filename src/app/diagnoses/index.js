import angular from 'angular';

import {
  diagnosisPermissionFactory,
  diagnosesControllerFactory,
  diagnosesComponent
} from './diagnoses-component.directive';
import {
  diagnosisGroupsControllerFactory,
  diagnosisGroupsComponent
} from './groups-component.directive';

import templateUrl from './diagnoses.html';

function config($stateProvider) {
  $stateProvider.state('diagnoses', {
    url: '/diagnoses',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.diagnoses', [])
  .config(config)
  .factory('DiagnosisPermission', diagnosisPermissionFactory)
  .factory('DiagnosesController', diagnosesControllerFactory)
  .directive('diagnosesComponent', diagnosesComponent)
  .factory('DiagnosisGroupsController', diagnosisGroupsControllerFactory)
  .directive('diagnosisGroupsComponent', diagnosisGroupsComponent)
  .name;
