import angular from 'angular';

import {
  patientAliasPermissionFactory,
  patientAliasesControllerFactory,
  patientAliasesComponent
} from './aliases-component.directive';

import templateUrl from './aliases.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('patient-aliases', 'SourceModelMixin');

  $stateProvider.state('patient.aliases', {
    url: '/aliases',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.aliases', [])
  .config(config)
  .factory('PatientAliasPermission', patientAliasPermissionFactory)
  .factory('PatientAliasesController', patientAliasesControllerFactory)
  .directive('patientAliasesComponent', patientAliasesComponent)
  .name;
