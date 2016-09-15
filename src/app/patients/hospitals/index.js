import angular from 'angular';

import templateUrl from './hospitals.html';

function config($stateProvider) {
  $stateProvider.state('patient.hospitals', {
    url: '/hospitals',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.hospitals', [])
  .config(config)
  .name;
