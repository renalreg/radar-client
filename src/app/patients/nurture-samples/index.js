import angular from 'angular';

import {
  nurtureSamplesPermissionFactory,
  nurtureSamplesControllerFactory,
  nurtureSamplesComponent
} from './nurture-samples-component.directive';

import templateUrl from './nurture-samples.html';

function config($stateProvider) {
  $stateProvider.state('patient.nurtureSamples', {
    url: '/samples',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.samples', [])
  .config(config)
  .factory('NurtureSamplesPermission', nurtureSamplesPermissionFactory)
  .factory('NurtureSamplesController', nurtureSamplesControllerFactory)
  .directive('nurtureSamplesComponent', nurtureSamplesComponent)
  .name;
