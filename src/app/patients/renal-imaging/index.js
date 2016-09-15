import angular from 'angular';

import templateUrl from './renal-imaging.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('renal-imaging', 'SourceModelMixin');

  $stateProvider.state('patient.renalImaging', {
    url: '/renal-imaging',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.renalImaging', [])
  .config(config)
  .name;
