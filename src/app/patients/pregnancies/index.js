import angular from 'angular';

import templateUrl from './pregnancies.html';

function config($stateProvider) {
  $stateProvider.state('patient.pregnancies', {
    url: '/pregnancies',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.pregnancies', [])
  .config(config)
  .name;
