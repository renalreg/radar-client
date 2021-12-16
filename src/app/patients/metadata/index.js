import angular from 'angular';

import {
  patientMetadataPermissionFactory,
  patientMetadataControllerFactory,
  patientMetadataComponent,
} from './metadata-component.directive';

import templateUrl from './metadata.html';

function config($stateProvider) {
  $stateProvider.state('patient.metadata', {
    url: '/metadata',
    templateUrl: templateUrl,
  });
}

config.$inject = ['$stateProvider'];

export default angular
  .module('radar.patients.metadata', [])
  .config(config)
  .factory('PatientMetadataPermission', patientMetadataPermissionFactory)
  .factory('PatientMetadataController', patientMetadataControllerFactory)
  .directive('patientMetadataComponent', patientMetadataComponent).name;
