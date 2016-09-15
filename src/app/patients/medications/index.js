import angular from 'angular';

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
  .name;
