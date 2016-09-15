import angular from 'angular';

import templateUrl from './plasmapheresis.html';

function config($stateProvider) {
  $stateProvider.state('patient.plasmapheresis', {
    url: '/plasmapheresis',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.plasmapheresis', [])
  .config(config)
  .name;
