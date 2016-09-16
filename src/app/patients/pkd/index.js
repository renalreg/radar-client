import angular from 'angular';

import {
  liverDiseasesPermissionFactory,
  liverDiseasesControllerFactory,
  liverDiseasesComponent
} from './liver-diseases-component.directive';
import {
  liverImagingPermissionFactory,
  liverImagingControllerFactory,
  liverImagingComponent
} from './liver-imaging-component.directive';
import {
  liverTransplantPermissionFactory,
  liverTransplantsControllerFactory,
  liverTransplantsComponent
} from './liver-transplants-component.directive';
import {
  nutritionPermissionFactory,
  nutritionControllerFactory,
  nutritionComponent
} from './nutrition-component.directive';

import liverImagingTemplateUrl from './liver-imaging.html';
import liverTransplantsTemplateUrl from './liver-transplants.html';
import liverDiseasesTemplateUrl from './liver-diseases.html';
import nutritionTemplateUrl from './nutrition.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('liver-imaging', 'SourceModelMixin');
  storeProvider.registerMixin('liver-transplants', 'SourceModelMixin');
  storeProvider.registerMixin('nutrition', 'SourceModelMixin');

  $stateProvider.state('patient.liverImaging', {
    url: '/liver-imaging',
    templateUrl: liverImagingTemplateUrl
  });

  $stateProvider.state('patient.liverTransplants', {
    url: '/liver-transplants',
    templateUrl: liverTransplantsTemplateUrl
  });

  $stateProvider.state('patient.liverDiseases', {
    url: '/liver-diseases',
    templateUrl: liverDiseasesTemplateUrl
  });

  $stateProvider.state('patient.nutrition', {
    url: '/nutrition',
    templateUrl: nutritionTemplateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.pkd', [])
  .config(config)
  .factory('LiverDiseasesPermission', liverDiseasesPermissionFactory)
  .factory('LiverDiseasesController', liverDiseasesControllerFactory)
  .directive('liverDiseasesComponent', liverDiseasesComponent)
  .factory('LiverImagingPermission', liverImagingPermissionFactory)
  .factory('LiverImagingController', liverImagingControllerFactory)
  .directive('liverImagingComponent', liverImagingComponent)
  .factory('LiverTransplantPermission', liverTransplantPermissionFactory)
  .factory('LiverTransplantsController', liverTransplantsControllerFactory)
  .directive('liverTransplantsComponent', liverTransplantsComponent)
  .factory('NutritionPermission', nutritionPermissionFactory)
  .factory('NutritionController', nutritionControllerFactory)
  .directive('nutritionComponent', nutritionComponent)
  .name;
