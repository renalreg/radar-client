import angular from 'angular';

import templateUrl from './pathology.html';

function config($stateProvider) {
  $stateProvider.state('patient.pathology', {
    url: '/pathology',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.pathology', [])
  .config(config)
  .name;
