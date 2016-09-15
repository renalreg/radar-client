import angular from 'angular';

import templateUrl from './pathology.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('pathology', 'SourceModelMixin');

  $stateProvider.state('patient.pathology', {
    url: '/pathology',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.pathology', [])
  .config(config)
  .name;
