import angular from 'angular';

import templateUrl from './results.html';

function config($stateProvider) {
  $stateProvider.state('patient.results', {
    url: '/results',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.results', [])
  .config(config)
  .name;
