import angular from 'angular';

import {
  rituximabBaselineAssessmentPermissionFactory,
  rituximabBaselineAssessmentControllerFactory,
  rituximabBaselineAssessmentComponent
} from './baseline-assessment-component.directive';

import {
  rituximabConsentPermissionFactory,
  rituximabConsentControllerFactory,
  rituximabConsentComponent
} from './consent-component.directive';

import baselineUrl from './baseline.html';
import consentUrl from './consent.html';


function config($stateProvider) {
  // storeProvider.registerMixin('renal-imaging', 'SourceModelMixin');

  $stateProvider.state('patient.rituximabBaselineAssessment', {
    url: '/rituximab-baseline-assessment',
    templateUrl: baselineUrl
  });

  $stateProvider.state('patient.rituximabConsent', {
    url: '/rituximab-consent',
    templateUrl: consentUrl
  });

}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.rituximab', [])
  .config(config)
  .factory('RituximabBaselineAssessmentPermission', rituximabBaselineAssessmentPermissionFactory)
  .factory('RituximabBaselineAssessmentController', rituximabBaselineAssessmentControllerFactory)
  .directive('rituximabBaselineAssessmentComponent', rituximabBaselineAssessmentComponent)
  .factory('RituximabConsentPermission', rituximabConsentPermissionFactory)
  .factory('RituximabConsentController', rituximabConsentControllerFactory)
  .directive('rituximabConsentComponent', rituximabConsentComponent)

  .name;
