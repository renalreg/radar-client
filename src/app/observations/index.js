import angular from 'angular';

import {
  observationsControllerFactory,
  observationsComponent
} from './observations-component.directive';

import templateUrl from './observations.html';

function config($stateProvider) {
  $stateProvider.state('observations', {
    url: '/observations',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.observations', [])
  .config(config)
  .factory('ObservationsController', observationsControllerFactory)
  .directive('observationsComponent', observationsComponent)
  .name;
