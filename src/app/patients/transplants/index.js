import angular from 'angular';

import templateUrl from './transplants.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('transplants', 'TransplantModel');
  storeProvider.registerMixin('transplants', 'SourceModelMixin');

  $stateProvider.state('patient.transplants', {
    url: '/transplants',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.transplants', [])
  .config(config)
  .name;
