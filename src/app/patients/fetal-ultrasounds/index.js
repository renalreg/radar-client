import angular from 'angular';

import templateUrl from './fetal-ultrasounds.html';

function config($stateProvider) {
  $stateProvider.state('patient.fetalUltrasounds', {
    url: '/fetal-ultrasounds',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.fetalUltrasounds', [])
  .config(config)
  .name;
