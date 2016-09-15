import angular from 'angular';

import templateUrl from './clinical-pictures.html';

function config($stateProvider) {
  $stateProvider.state('patient.mpgnClinicalPictures', {
    url: '/mpgn-clinical-pictures',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.mpgn', [])
  .config(config)
  .name;
