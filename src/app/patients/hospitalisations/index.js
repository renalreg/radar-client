import angular from 'angular';

import templateUrl from './hospitalisations.html';

function config($stateProvider) {
  $stateProvider.state('patient.hospitalisations', {
    url: '/hospitalisations',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.hospitalisations', [])
  .config(config)
  .name;
