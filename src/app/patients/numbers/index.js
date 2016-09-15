import angular from 'angular';

import templateUrl from './numbers.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('patient-numbers', 'SourceModelMixin');

  $stateProvider.state('patient.numbers', {
    url: '/numbers',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.numbers', [])
  .config(config)
  .name;
