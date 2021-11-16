import angular from 'angular';

import {
  patientNurtureDataPermissionFactory,
  patientNurtureDataControllerFactory,
  patientNurtureDataComponent
} from './nurturedata-component.directive';

import templateUrl from './nurturedata.html';

function config($stateProvider) {
  $stateProvider.state('patient.nurturedata', {
    url: '/nurturedata',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.nurturedata', [])
  .config(config)
  .factory('PatientNurtureDataPermission', patientNurtureDataPermissionFactory)
  .factory('PatientNurtureDataController', patientNurtureDataControllerFactory)
  .directive('patientNurtureDataComponent', patientNurtureDataComponent)
  .name;
