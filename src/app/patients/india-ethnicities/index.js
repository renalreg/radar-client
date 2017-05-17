import angular from 'angular';

import {
  indiaEthnicityPermissionFactory,
  indiaEthnicitiesControllerFactory,
  indiaEthnicitiesComponent
} from './india-ethnicities-component.directive';

import templateUrl from './india-ethnicities.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('india-ethnicities', 'SourceModelMixin');

  $stateProvider.state('patient.indiaEthnicities', {
    url: '/india-ethnicities',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.indiaEthnicities', [])
  .config(config)
  .factory('IndiaEthnicityPermission', indiaEthnicityPermissionFactory)
  .factory('IndiaEthnicitiesController', indiaEthnicitiesControllerFactory)
  .directive('indiaEthnicitiesComponent', indiaEthnicitiesComponent)
  .name;
