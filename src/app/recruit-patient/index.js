import angular from 'angular';

import RecruitPatientController from './recruit-patient.controller';
import recruitPatientPermission from './recruit-patient-permission.directive';

import recruitPatientTemplateUrl from './recruit-patient.html';
import recruitPatientSearchTemplateUrl from './recruit-patient-search.html';
import recruitPatientFormTemplateUrl from './recruit-patient-form.html';
import recruitePatientDiagnosisFormTemplateUrl from './recruit-patient-diagnosis-form.html';

function config($stateProvider) {
  $stateProvider.state('recruitPatient', {
    url: '/recruit-patient',
    abstract: true,
    controller: 'RecruitPatientController',
    templateUrl: recruitPatientTemplateUrl
  });

  $stateProvider.state('recruitPatient.search', {
    url: '',
    templateUrl: recruitPatientSearchTemplateUrl
  });

  $stateProvider.state('recruitPatient.form', {
    url: '',
    templateUrl: recruitPatientFormTemplateUrl
  });

  $stateProvider.state('recruitPatient.diagnosis', {
    url: '',
    templateUrl: recruitePatientDiagnosisFormTemplateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.recruitPatient', [])
  .config(config)
  .controller('RecruitPatientController', RecruitPatientController)
  .directive('recruitPatientPermission', recruitPatientPermission)
  .name;
