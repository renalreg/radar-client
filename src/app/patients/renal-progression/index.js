import angular from 'angular';

import templateUrl from './renal-progression.html';

function config($stateProvider) {
  $stateProvider.state('patient.renalProgression', {
    url: '/renal-progression',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.renalProgression', [])
  .config(config)
  .name;
