import angular from 'angular';

import diagnosesTemplateUrl from './diagnoses.html';
import primaryDiagnosisTemplateUrl from './primary-diagnosis.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('patient-diagnoses', 'PatientDiagnosisModel');
  storeProvider.registerMixin('patient-diagnoses', 'SourceModelMixin');

  $stateProvider.state('patient.diagnoses', {
    url: '/comorbidities',
    templateUrl: diagnosesTemplateUrl
  });

  $stateProvider.state('patient.primaryDiagnosis', {
    url: '/primary-diagnosis/:cohortId',
    templateUrl: primaryDiagnosisTemplateUrl,
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

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients.diagnoses', [])
  .config(config)
  .name;
