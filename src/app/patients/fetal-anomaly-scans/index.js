import angular from 'angular';

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
  .name;
