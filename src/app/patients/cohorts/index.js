import angular from 'angular';

import {
  patientCohortPermissionFactory,
  patientCohortsControllerFactory,
  patientCohortsComponent
} from './cohorts-component.directive';

import cohortsTemplateUrl from './cohorts.html';
import cohortTemplateUrl from './cohort.html';

function config($stateProvider) {
  $stateProvider.state('patient.cohorts', {
    url: '/cohorts',
    templateUrl: cohortsTemplateUrl
  });

  $stateProvider.state('patient.cohort', {
    url: '/cohorts/:cohortId',
    templateUrl: cohortTemplateUrl,
    controller: ['$scope', 'cohort', function($scope, cohort) {
      $scope.cohort = cohort;
    }],
    resolve: {
      cohort: ['$stateParams', 'cohortStore', function($stateParams, cohortStore) {
        return cohortStore.findOne($stateParams.cohortId);
      }]
    }
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients.cohorts', [])
  .config(config)
  .factory('PatientCohortPermission', patientCohortPermissionFactory)
  .factory('PatientCohortsController', patientCohortsControllerFactory)
  .directive('patientCohortsComponent', patientCohortsComponent)
  .name;
