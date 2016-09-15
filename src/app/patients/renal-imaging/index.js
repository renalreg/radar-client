import angular from 'angular';

import templateUrl from './renal-imaging.html';

function config($stateProvider) {
  $stateProvider.state('patient.renalImaging', {
    url: '/renal-imaging',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.renalImaging', [])
  .config(config)
  .name;
