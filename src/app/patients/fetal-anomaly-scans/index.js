import angular from 'angular';

import {
  fetalAnomalyScanPermissionFactory,
  fetalAnomalyScansControllerFactory,
  fetalAnomalyScansComponent
} from './fetal-anomaly-scans-component.directive';

import templateUrl from './fetal-anomaly-scans.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('fetal-anomaly-scans', 'SourceModelMixin');

  $stateProvider.state('patient.fetalAnomalyScans', {
    url: '/fetal-anomaly-scans',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.fetalAnomalyScans', [])
  .config(config)
  .factory('FetalAnomalyScanPermission', fetalAnomalyScanPermissionFactory)
  .factory('FetalAnomalyScansController', fetalAnomalyScansControllerFactory)
  .directive('fetalAnomalyScansComponent', fetalAnomalyScansComponent)
  .name;
