import angular from 'angular';

import {
  hospitalisationPermissionFactory,
  hospitalisationsControllerFactory,
  hospitalisationsComponent
} from './hospitalisations-component.directive';

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
  .factory('HospitalisationPermission', hospitalisationPermissionFactory)
  .factory('HospitalisationsController', hospitalisationsControllerFactory)
  .directive('hospitalisationsComponent', hospitalisationsComponent)
  .name;
