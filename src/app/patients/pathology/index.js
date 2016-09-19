import angular from 'angular';

import {
  pathologyPermissionFactory,
  pathologyControllerFactory,
  pathologyComponent
} from './pathology-component.directive';

import templateUrl from './pathology.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('pathology', 'SourceModelMixin');

  $stateProvider.state('patient.pathology', {
    url: '/pathology',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.pathology', [])
  .config(config)
  .factory('PathologyPermission', pathologyPermissionFactory)
  .factory('PathologyController', pathologyControllerFactory)
  .directive('pathologyComponent', pathologyComponent)
  .name;
