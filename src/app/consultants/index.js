import angular from 'angular';
import uiRouter from 'angular-ui-router';

import consultantModelFactory from './consultant-model';
import {
  consultantPermissionFactory,
  consultantsControllerFactory,
  consultantsComponent
} from './consultants-component.directive';
import {
  consultantHospitalsControllerFactory,
  consultantHospitalsComponent
} from './hospitals-component.directive';

import templateUrl from './consultants.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('consultants', 'ConsultantModel');

  $stateProvider.state('consultants', {
    url: '/consultants',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.consultants', [uiRouter])
  .config(config)
  .factory('ConsultantModel', consultantModelFactory)
  .factory('ConsultantPermission', consultantPermissionFactory)
  .factory('ConsultantsController', consultantsControllerFactory)
  .directive('consultantsComponent', consultantsComponent)
  .factory('ConsultantHospitalsController', consultantHospitalsControllerFactory)
  .directive('consultantHospitalsComponent', consultantHospitalsComponent)
  .name;
