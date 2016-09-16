import angular from 'angular';

import {
  transplantBiopsiesControllerFactory,
  transplantBiopsiesComponent
} from './biopsies-component.directive';
import {
  transplantRejectionsControllerFactory,
  transplantRejectionsComponent
} from './rejections-component.directive';
import transplantModelFactory from './transplant-model';
import {
  transplantPermissionFactory,
  transplantsControllerFactory,
  transplantsComponent
} from './transplants-component.directive';

import templateUrl from './transplants.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('transplants', 'TransplantModel');
  storeProvider.registerMixin('transplants', 'SourceModelMixin');

  $stateProvider.state('patient.transplants', {
    url: '/transplants',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.transplants', [])
  .config(config)
  .factory('TransplantBiopsiesController', transplantBiopsiesControllerFactory)
  .directive('transplantBiopsiesComponent', transplantBiopsiesComponent)
  .factory('TransplantRejectionsController', transplantRejectionsControllerFactory)
  .directive('transplantRejectionsComponent', transplantRejectionsComponent)
  .factory('TransplantModel', transplantModelFactory)
  .factory('TransplantPermission', transplantPermissionFactory)
  .factory('TransplantsController', transplantsControllerFactory)
  .directive('transplantsComponent', transplantsComponent)
  .name;
