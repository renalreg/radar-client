import angular from 'angular';

import {
  mpgnClinicalPicturePermissionFactory,
  mpgnClinicalPicturesControllerFactory,
  mpgnClinicalPicturesComponent
} from './clinical-pictures-component.directive';

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
  .factory('MpgnClinicalPicturePermission', mpgnClinicalPicturePermissionFactory)
  .factory('MpgnClinicalPicturesController', mpgnClinicalPicturesControllerFactory)
  .directive('mpgnClinicalPicturesComponent', mpgnClinicalPicturesComponent)
  .name;
