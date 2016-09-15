import angular from 'angular';

import templateUrl from './transplants.html';

function config($stateProvider) {
  $stateProvider.state('patient.transplants', {
    url: '/transplants',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.transplants', [])
  .config(config)
  .name;
