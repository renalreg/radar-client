import angular from 'angular';

import drugSelector from './drug-selector.directive';
import medicationModelFactory from './medication-model';
import {
  medicationPermissionFactory,
  medicationsControllerFactory,
  medicationsComponent
} from './medications-component.directive';

import templateUrl from './medications.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('medications', 'MedicationModel');
  storeProvider.registerMixin('medications', 'SourceModelMixin');

  $stateProvider.state('patient.medications', {
    url: '/medications',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.medications', [])
  .config(config)
  .directive('drugSelector', drugSelector)
  .factory('MedicationModel', medicationModelFactory)
  .factory('MedicationPermission', medicationPermissionFactory)
  .factory('MedicationsController', medicationsControllerFactory)
  .directive('medicationsComponent', medicationsComponent)
  .name;
