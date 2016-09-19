import angular from 'angular';

import {
  plasmapheresisPermissionFactory,
  plasmapheresisControllerFactory,
  plasmapheresisComponent
} from './plasmapheresis-component.directive';

import templateUrl from './plasmapheresis.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerMixin('plasmapheresis', 'SourceModelMixin');

  $stateProvider.state('patient.plasmapheresis', {
    url: '/plasmapheresis',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.plasmapheresis', [])
  .config(config)
  .factory('PlasmapheresisPermission', plasmapheresisPermissionFactory)
  .factory('PlasmapheresisController', plasmapheresisControllerFactory)
  .directive('plasmapheresisComponent', plasmapheresisComponent)
  .name;
