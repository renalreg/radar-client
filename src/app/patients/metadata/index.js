import angular from 'angular';

import templateUrl from './metadata.html';

function config($stateProvider) {
  $stateProvider.state('patient.metadata', {
    url: '/metadata',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.metadata', [])
  .config(config)
  .name;
