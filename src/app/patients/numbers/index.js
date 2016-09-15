import angular from 'angular';

import templateUrl from './numbers.html';

function config($stateProvider) {
  $stateProvider.state('patient.numbers', {
    url: '/numbers',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.numbers', [])
  .config(config)
  .name;
