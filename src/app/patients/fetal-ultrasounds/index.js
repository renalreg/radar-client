import angular from 'angular';

import {
  fetalUltrasoundPermissionFactory,
  fetalUltrasoundsControllerFactory,
  fetalUltrasoundsComponent
} from './fetal-ultrasounds-component.directive';

import templateUrl from './fetal-ultrasounds.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('fetal-ultrasounds', 'SourceModelMixin');

  $stateProvider.state('patient.fetalUltrasounds', {
    url: '/fetal-ultrasounds',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.fetalUltrasounds', [])
  .config(config)
  .factory('FetalUltrasoundPermission', fetalUltrasoundPermissionFactory)
  .factory('FetalUltrasoundsController', fetalUltrasoundsControllerFactory)
  .directive('fetalUltrasoundsComponent', fetalUltrasoundsComponent)
  .name;
