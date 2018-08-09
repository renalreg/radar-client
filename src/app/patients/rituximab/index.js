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
import rituximabCriteriaModelFactory from './criteria-model';


function config($stateProvider, storeProvider) {
  storeProvider.registerModel('rituximab-criteria', 'RituximabCriteriaModel');

  $stateProvider.state('patient.rituximabBaselineAssessment', {
    url: '/rituximab-baseline-assessment',
    templateUrl: baselineUrl
  });

  $stateProvider.state('patient.rituximabCriteria', {
    url: '/rituximab-criteria',
    templateUrl: criteriaUrl
  });

}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.rituximab', [])
  .config(config)
  .factory('RituximabBaselineAssessmentPermission', rituximabBaselineAssessmentPermissionFactory)
  .factory('RituximabBaselineAssessmentController', rituximabBaselineAssessmentControllerFactory)
  .directive('rituximabBaselineAssessmentComponent', rituximabBaselineAssessmentComponent)
  .factory('RituximabCriteriaModel', rituximabCriteriaModelFactory)
  .factory('RituximabCriteriaPermission', rituximabCriteriaPermissionFactory)
  .factory('RituximabCriteriaController', rituximabCriteriaControllerFactory)
  .directive('rituximabCriteriaComponent', rituximabCriteriaComponent)

  .name;
