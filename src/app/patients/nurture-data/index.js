import angular from 'angular';

import {
  patientNurtureDataPermissionFactory,
  patientNurtureDataControllerFactory,
  patientNurtureDataComponent,
} from './nurture-data.directive';

import templateUrl from './nurture-data.html';

function config($stateProvider) {
  $stateProvider.state('patient.nurture-data', {
    url: '/nurture-data',
    templateUrl: templateUrl,
  });
}

config.$inject = ['$stateProvider'];

export default angular
  .module('radar.patients.nurture-data', [])
  .config(config)
  .factory('PatientNurtureDataPermission', patientNurtureDataPermissionFactory)
  .factory('PatientNurtureDataController', patientNurtureDataControllerFactory)
  .directive('patientNurtureDataComponent', patientNurtureDataComponent).name;
