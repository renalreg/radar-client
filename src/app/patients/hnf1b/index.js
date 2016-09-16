import angular from 'angular';

import {
  hnf1bClinicalPicturePermissionFactory,
  hnf1bClinicalPicturesControllerFactory,
  hnf1bClinicalPicturesComponent
} from './clinical-pictures-component.directive';

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
  .factory('Hnf1bClinicalPicturePermission', hnf1bClinicalPicturePermissionFactory)
  .factory('Hnf1bClinicalPicturesController', hnf1bClinicalPicturesControllerFactory)
  .directive('hnf1bClinicalPicturesComponent', hnf1bClinicalPicturesComponent)
  .name;
