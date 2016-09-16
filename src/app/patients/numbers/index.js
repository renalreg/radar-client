import angular from 'angular';

import {
  patientNumberPermissionFactory,
  patientNumbersControllerFactory,
  patientNumbersComponent
} from './numbers-component.directive';

import templateUrl from './numbers.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('patient-numbers', 'SourceModelMixin');

  $stateProvider.state('patient.numbers', {
    url: '/numbers',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.numbers', [])
  .config(config)
  .factory('PatientNumberPermission', patientNumberPermissionFactory)
  .factory('PatientNumbersController', patientNumbersControllerFactory)
  .directive('patientNumbersComponent', patientNumbersComponent)
  .name;
