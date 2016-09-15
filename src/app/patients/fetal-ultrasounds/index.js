import angular from 'angular';

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
  .name;
