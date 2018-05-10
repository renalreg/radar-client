import angular from 'angular';

import {
  rituximabBaselineAssessmentPermissionFactory,
  rituximabBaselineAssessmentControllerFactory,
  rituximabBaselineAssessmentComponent
} from './baseline-assessment-component.directive';

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
  .config(config)
  .factory('RituximabBaselineAssessmentPermission', rituximabBaselineAssessmentPermissionFactory)
  .factory('RituximabBaselineAssessmentController', rituximabBaselineAssessmentControllerFactory)
  .directive('rituximabBaselineAssessmentComponent', rituximabBaselineAssessmentComponent)
  .name;
