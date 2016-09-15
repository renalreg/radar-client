import angular from 'angular';

import {
  alportClinicalPicturePermissionFactory,
  alportClinicalPicturesControllerFactory,
  alportClinicalPicturesComponent
} from './clinical-pictures-component.directive';

import templateUrl from './clinical-pictures.html';

function config($stateProvider) {
  $stateProvider.state('patient.alportClinicalPictures', {
    url: '/alport-clinical-pictures',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.alport', [])
  .config(config)
  .factory('AlportClinicalPicturePermission', alportClinicalPicturePermissionFactory)
  .factory('AlportClinicalPicturesController', alportClinicalPicturesControllerFactory)
  .directive('alportClinicalPicturesComponent', alportClinicalPicturesComponent)
  .name;
