import angular from 'angular';

import templateUrl from './medications.html';

function config($stateProvider) {
  $stateProvider.state('patient.medications', {
    url: '/medications',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.medications', [])
  .config(config)
  .name;
