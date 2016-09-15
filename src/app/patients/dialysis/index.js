import angular from 'angular';

import templateUrl from './dialysis.html';

function config($stateProvider) {
  $stateProvider.state('patient.dialysis', {
    url: '/dialysis',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.dialysis', [])
  .config(config)
  .name;
