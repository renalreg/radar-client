import angular from 'angular';

import templateUrl from './hospitalisations.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('hospitalisations', 'SourceModelMixin');

  $stateProvider.state('patient.hospitalisations', {
    url: '/hospitalisations',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.hospitalisations', [])
  .config(config)
  .name;
