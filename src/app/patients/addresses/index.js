import angular from 'angular';

import {
  patientAddressPermissionFactory,
  patientAddressesControllerFactory,
  patientAddressesComponent
} from './addresses-component.directive';
import patientAddressModelFactory from './address-model';

import templateUrl from './addresses.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('patient-addresses', 'PatientAddressModel');
  storeProvider.registerMixin('patient-addresses', 'SourceModelMixin');

  $stateProvider.state('patient.addresses', {
    url: '/addresses',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.addresses', [])
  .config(config)
  .factory('PatientAddressPermission', patientAddressPermissionFactory)
  .factory('PatientAddressesController', patientAddressesControllerFactory)
  .directive('patientAddressesComponent', patientAddressesComponent)
  .factory('PatientAddressModel', patientAddressModelFactory)
  .name;
