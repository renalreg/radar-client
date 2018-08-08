import angular from 'angular';

import {
  rituximabBaselineAssessmentPermissionFactory,
  rituximabBaselineAssessmentControllerFactory,
  rituximabBaselineAssessmentComponent
} from './baseline-assessment-component.directive';

import {
  rituximabCriteriaPermissionFactory,
  rituximabCriteriaControllerFactory,
  rituximabCriteriaComponent
} from './criteria-component.directive';

import baselineUrl from './baseline.html';
import criteriaUrl from './criteria.html';


function config($stateProvider) {
  // storeProvider.registerMixin('renal-imaging', 'SourceModelMixin');

  $stateProvider.state('patient.rituximabBaselineAssessment', {
    url: '/rituximab-baseline-assessment',
    templateUrl: baselineUrl
  });

  $stateProvider.state('patient.rituximabCriteria', {
    url: '/rituximab-criteria',
    templateUrl: criteriaUrl
  });

}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.rituximab', [])
  .config(config)
  .factory('RituximabBaselineAssessmentPermission', rituximabBaselineAssessmentPermissionFactory)
  .factory('RituximabBaselineAssessmentController', rituximabBaselineAssessmentControllerFactory)
  .directive('rituximabBaselineAssessmentComponent', rituximabBaselineAssessmentComponent)
  .factory('RituximabCriteriaPermission', rituximabCriteriaPermissionFactory)
  .factory('RituximabCriteriaController', rituximabCriteriaControllerFactory)
  .directive('rituximabCriteriaComponent', rituximabCriteriaComponent)

  .name;
