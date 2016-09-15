import angular from 'angular';

import templateUrl from './nephrectomies.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('nephrectomies', 'SourceModelMixin');

  $stateProvider.state('patient.nephrectomies', {
    url: '/nephrectomies',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.nephrectomies', [])
  .config(config)
  .name;
