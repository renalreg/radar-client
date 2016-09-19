import angular from 'angular';

import {
  dialysisPermissionFactory,
  dialysisControllerFactory,
  dialysisComponent
} from './dialysis-component.directive';

import templateUrl from './dialysis.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('dialysis', 'SourceModelMixin');

  $stateProvider.state('patient.dialysis', {
    url: '/dialysis',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.dialysis', [])
  .config(config)
  .factory('DialysisPermission', dialysisPermissionFactory)
  .factory('DialysisController', dialysisControllerFactory)
  .directive('dialysisComponent', dialysisComponent)
  .name;
