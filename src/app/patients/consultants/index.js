import angular from 'angular';

import {
  patientConsultantPermissionFactory,
  patientConsultantsControllerFactory,
  patientConsultantsComponent
} from './consultants-component.directive';
import patientConsultantModelFactory from './consultant-model';

import templateUrl from './consultants.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('patient-consultants', 'PatientConsultantModel');

  $stateProvider.state('patient.consultants', {
    url: '/consultants',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.consultants', [])
  .config(config)
  .factory('PatientConsultantPermission', patientConsultantPermissionFactory)
  .factory('PatientConsultantsPermission', patientConsultantsControllerFactory)
  .directive('patientConsultantsComponent', patientConsultantsComponent)
  .factory('patientConsultantModelFactory', PatientConsultantModel)
  .name;
