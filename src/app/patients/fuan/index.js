import angular from 'angular';

import templateUrl from './clinical-pictures.html';

function config($stateProvider) {
  $stateProvider.state('patient.fuanClinicalPictures', {
    url: '/adtkd-clinical-pictures',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.fuan', [])
  .config(config)
  .name;
