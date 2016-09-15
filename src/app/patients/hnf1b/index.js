import angular from 'angular';

import templateUrl from './clinical-pictures.html';

function config($stateProvider) {
  $stateProvider.state('patient.hnf1bClinicalPictures', {
    url: '/hnf1b-clinical-pictures',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.hnf1b', [])
  .config(config)
  .name;
