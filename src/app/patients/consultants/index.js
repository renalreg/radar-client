import angular from 'angular';

import templateUrl from './consultants.html';

function config($stateProvider) {
  $stateProvider.state('patient.consultants', {
    url: '/consultants',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.consultants', [])
  .name;
