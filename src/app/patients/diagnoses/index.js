import angular from 'angular';

import {
  absentDiagnosesControllerFactory,
  absentDiagnosesComponent
} from './absent-diagnoses-component.directive';
import {
  patientDiagnosesControllerFactory,
  patientDiagnosesComponent
} from './diagnoses-component.directive';
import diagnosisSelector from './diagnosis-selector.directive';
import patientDiagnosisModelFactory from './patient-diagnosis-model';
import patientDiagnosisPermissionFactory from './patient-diagnosis-permission';
import {
  primaryPatientDiagnosisControllerFactory,
  primaryPatientDiagnosisComponent
} from './primary-diagnosis-component.directive';
import primaryDiagnosisSelector from './primary-diagnosis-selector.directive';

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
  .factory('AbsentDiagnosesController', absentDiagnosesControllerFactory)
  .directive('absentDiagnosesComponent', absentDiagnosesComponent)
  .factory('PatientDiagnosesController', patientDiagnosesControllerFactory)
  .directive('patientDiagnosesComponent', patientDiagnosesComponent)
  .directive('diagnosisSelector', diagnosisSelector)
  .factory('PatientDiagnosisModel', patientDiagnosisModelFactory)
  .factory('PatientDiagnosisPermission', patientDiagnosisPermissionFactory)
  .factory('PrimaryPatientDiagnosisController', primaryPatientDiagnosisControllerFactory)
  .directive('primaryPatientDiagnosisComponent', primaryPatientDiagnosisComponent)
  .directive('primaryDiagnosisSelector', primaryDiagnosisSelector)
  .name;
