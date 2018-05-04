import angular from 'angular';

// import {
  // renalImagingPermissionFactory,
  // renalImagingControllerFactory,
  // renalImagingComponent
// } from './renal-imaging-component.directive';

import templateUrl from './baseline.html';

function config($stateProvider) {
  // storeProvider.registerMixin('renal-imaging', 'SourceModelMixin');

  $stateProvider.state('patient.rituximabBaselineAssessment', {
    url: '/rituximab-baseline-assessment',
    templateUrl: templateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.rituximab', [])
//   .config(config)
//   .factory('RenalImagingPermission', renalImagingPermissionFactory)
//   .factory('RenalImagingController', renalImagingControllerFactory)
//   .directive('renalImagingComponent', renalImagingComponent)
   .name;
