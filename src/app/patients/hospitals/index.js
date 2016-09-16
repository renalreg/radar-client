import angular from 'angular';

import {
  patientHospitalPermissionFactory,
  patientHospitalsControllerFactory,
  patientHospitalsComponent
} from './hospitals-component.directive';

import templateUrl from './hospitals.html';

function config($stateProvider) {
  $stateProvider.state('patient.hospitals', {
    url: '/hospitals',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.hospitals', [])
  .config(config)
  .factory('PatientHospitalPermission', patientHospitalPermissionFactory)
  .factory('PatientHospitalsController', patientHospitalsControllerFactory)
  .directive('patientHospitalsComponent', patientHospitalsComponent)
  .name;
