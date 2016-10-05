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
import diagnosisModelFactory from './diagnosis-model';

import templateUrl from './diagnoses.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('diagnoses', 'DiagnosisModel');

  $stateProvider.state('diagnoses', {
    url: '/diagnoses',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.diagnoses', [])
  .config(config)
  .factory('DiagnosisPermission', diagnosisPermissionFactory)
  .factory('DiagnosesController', diagnosesControllerFactory)
  .directive('diagnosesComponent', diagnosesComponent)
  .factory('DiagnosisGroupsController', diagnosisGroupsControllerFactory)
  .directive('diagnosisGroupsComponent', diagnosisGroupsComponent)
  .factory('DiagnosisModel', diagnosisModelFactory)
  .name;
