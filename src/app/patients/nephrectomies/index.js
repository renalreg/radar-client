import angular from 'angular';

import templateUrl from './nephrectomies.html';

function config($stateProvider) {
  $stateProvider.state('patient.nephrectomies', {
    url: '/nephrectomies',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.nephrectomies', [])
  .config(config)
  .name;
