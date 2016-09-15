import angular from 'angular';

import templateUrl from './results.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('results', 'ResultModel');
  storeProvider.registerMixin('results', 'SourceModelMixin');

  $stateProvider.state('patient.results', {
    url: '/results',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.results', [])
  .config(config)
  .name;
