import angular from 'angular';

import clinicalPicturesTemplateUrl from './clinical-pictures.html';
import relapsesTemplateUrl from './relapses.html';

function config($stateProvider) {
  $stateProvider.state('patient.insClinicalPictures', {
    url: '/ins-clinical-pictures',
    templateUrl: clinicalPicturesTemplateUrl
  });

  $stateProvider.state('patient.insRelapses', {
    url: '/ins-relapses',
    templateUrl: relapsesTemplateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.ins', [])
  .config(config)
  .name;
