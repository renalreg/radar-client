import angular from 'angular';

import {
  fuanClinicalPicturePermissionFactory,
  fuanClinicalPicturesControllerFactory,
  fuanClinicalPicturesComponent
} from './clinical-pictures-component.directive';

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
  .factory('FuanClinicalPicturePermission', fuanClinicalPicturePermissionFactory)
  .factory('FuanClinicalPicturesController', fuanClinicalPicturesControllerFactory)
  .directive('fuanClinicalPicturesComponent', fuanClinicalPicturesComponent)
  .name;
