import angular from 'angular';

import {
  pregnancyPermissionFactory,
  pregnanciesControllerFactory,
  pregnanciesComponent
} from './pregnancies-component.directive';

import templateUrl from './pregnancies.html';

function config($stateProvider) {
  $stateProvider.state('patient.pregnancies', {
    url: '/pregnancies',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.pregnancies', [])
  .config(config)
  .factory('PregnancyPermission', pregnancyPermissionFactory)
  .factory('PregnanciesController', pregnanciesControllerFactory)
  .directive('pregnanciesComponent', pregnanciesComponent)
  .name;
