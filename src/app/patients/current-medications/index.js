import angular from 'angular';

import currentMedicationModelFactory from './current-medication-model';
import {
  currentMedicationPermissionFactory,
  currentMedicationsControllerFactory,
  currentMedicationsComponent
} from './current-medications-component.directive';

import templateUrl from './medications.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('current-medications', 'CurrentMedicationModel');
  storeProvider.registerMixin('current-medications', 'SourceModelMixin');

  $stateProvider.state('patient.currentMedications', {
    url: '/current-medications',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.currentMedications', [])
  .config(config)
  .factory('CurrentMedicationModel', currentMedicationModelFactory)
  .factory('CurrentMedicationPermission', currentMedicationPermissionFactory)
  .factory('CurrentMedicationsController', currentMedicationsControllerFactory)
  .directive('currentMedicationsComponent', currentMedicationsComponent)
  .name;
