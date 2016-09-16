import angular from 'angular';

import {
  saltWastingClinicalFeaturesPermissionFactory,
  saltWastingClinicalFeaturesControllerFactory,
  saltWastingClinicalFeaturesComponent
} from './clinical-features-component.directive';

import templateUrl from './clinical-features.html';

function config($stateProvider) {
  $stateProvider.state('patient.saltWastingClinicalFeatures', {
    url: '/salt-wasting-clinical-features',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.saltWasting', [])
  .config(config)
  .factory('SaltWastingClinicalFeaturesPermission', saltWastingClinicalFeaturesPermissionFactory)
  .factory('SaltWastingClinicalFeaturesController', saltWastingClinicalFeaturesControllerFactory)
  .directive('saltWastingClinicalFeaturesComponent', saltWastingClinicalFeaturesComponent)
  .name;
