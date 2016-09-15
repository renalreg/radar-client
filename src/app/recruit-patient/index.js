import angular from 'angular';

import RecruitPatientController from './recruit-patient.controller';
import recruitPatientPermission from './recruit-patient-permission.directive';

import recruitPatientTemplateUrl from './recruit-patient.html';
import recruitPatientSearchTemplateUrl from './recruit-patient-search.html';
import recruitPatientFromTemplateUrl from './recruit-patient-form.html';

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
    templateUrl: recruitPatientFromTemplateUrl
  });
}

config.$inject = ['$stateProvider'];

export default angular.module('radar.recruitPatient', [])
  .config(config)
  .controller('RecruitPatientController', RecruitPatientController)
  .directive('recruitPatientPermission', recruitPatientPermission)
  .name;
