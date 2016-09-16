import angular from 'angular';

import {
  insClinicalPicturePermissionFactory,
  insClinicalPicturesControllerFactory,
  insClinicalPicturesComponent
} from './clinical-pictures-component.directive';
import {
  insRelapsePermissionFactory,
  insRelapsesControllerFactory,
  insRelapsesComponent
} from './relapses-component.directive';

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
  .factory('InsClinicalPicturePermission', insClinicalPicturePermissionFactory)
  .factory('InsClinicalPicturesController', insClinicalPicturesControllerFactory)
  .directive('insClinicalPicturesComponent', insClinicalPicturesComponent)
  .factory('InsRelapsePermission', insRelapsePermissionFactory)
  .factory('InsRelapsesController', insRelapsesControllerFactory)
  .directive('insRelapsesComponent', insRelapsesComponent)
  .name;
