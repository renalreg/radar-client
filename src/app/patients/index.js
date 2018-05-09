import angular from 'angular';

import addresses from './addresses';
import aliases from './aliases';
import alport from './alport';
import cohorts from './cohorts';
import consents from './consents';
import consultants from './consultants';
import currentMedications from './current-medications';
import demographics from './demographics';
import diagnoses from './diagnoses';
import dialysis from './dialysis';
import familyHistory from './family-history';
import fetalAnomalyScans from './fetal-anomaly-scans';
import fetalUltrasounds from './fetal-ultrasounds';
import forms from './forms';
import fuan from './fuan';
import genetics from './genetics';
import hnf1b from './hnf1b';
import hospitalisations from './hospitalisations';
import hospitals from './hospitals';
import indiaEthnicities from './india-ethnicities';
import ins from './ins';
import pkd from './pkd';
import medications from './medications';
import metadata from './metadata';
import mpgn from './mpgn';
import navigation from './navigation';
import nephrectomies from './nephrectomies';
import nurtureSamples from './nurture-samples';
import numbers from './numbers';
import pathology from './pathology';
import plasmapheresis from './plasmapheresis';
import pregnancies from './pregnancies';
import renalProgression from './renal-progression';
import renalImaging from './renal-imaging';
import results from './results';
import rituximab from './rituximab';
import saltWasting from './salt-wasting';
import transplants from './transplants';

import DeletePatientController from './delete-patient.controller';
import ifDemographicsHidden from './if-demographics-hidden.directive';
import ifDemographicsVisible from './if-demographics-visible.directive';
import PatientDetailController from './patient-detail.controller';
import patientListControllerFactory from './patient-list.controller';
import patientModelFactory from './patient-model';
import toggleDemographicsService from './toggle-demographics-service';
import toggleDemographics from './toggle-demographics.directive';

import patientListTemplateUrl from './patient-list.html';
import patientDetailTemplateUrl from './patient-detail.html';
import allTemplateUrl from './all.html';
import deletePatientTemplateUrl from './delete-patient.html';

function config($stateProvider, storeProvider) {
  storeProvider.registerModel('patients', 'PatientModel');

  $stateProvider.state('patients', {
    url: '/patients',
    templateUrl: patientListTemplateUrl,
    controller: ['$scope', '$controller', 'PatientListController', function($scope, $controller, PatientListController) {
      $controller(PatientListController, {$scope: $scope});
    }]
  });

  $stateProvider.state('patient', {
    url: '/patients/:patientId',
    abstract: true,
    templateUrl: patientDetailTemplateUrl,
    controller: 'PatientDetailController',
    resolve: {
      patient: ['$stateParams', 'store', function($stateParams, store) {
        return store.findOne('patients', $stateParams.patientId);
      }]
    },
    data: {
      title: false // don't update the title on state change (inherited by child states too)
    }
  });

  $stateProvider.state('patient.all', {
    url: '/all',
    templateUrl: allTemplateUrl
  });

  $stateProvider.state('patient.delete', {
    url: '/delete',
    templateUrl: deletePatientTemplateUrl,
    controller: 'DeletePatientController'
  });
}

config.$inject = ['$stateProvider', 'storeProvider'];

export default angular.module('radar.patients', [
  addresses,
  aliases,
  alport,
  cohorts,
  consents,
  consultants,
  currentMedications,
  demographics,
  diagnoses,
  dialysis,
  familyHistory,
  fetalAnomalyScans,
  fetalUltrasounds,
  forms,
  fuan,
  genetics,
  hnf1b,
  hospitalisations,
  hospitals,
  indiaEthnicities,
  ins,
  medications,
  metadata,
  mpgn,
  navigation,
  nephrectomies,
  nurtureSamples,
  numbers,
  pathology,
  pkd,
  plasmapheresis,
  pregnancies,
  renalProgression,
  renalImaging,
  results,
  rituximab,
  saltWasting,
  transplants
])
  .config(config)
  .controller('DeletePatientController', DeletePatientController)
  .directive('ifDemographicsHidden', ifDemographicsHidden)
  .directive('ifDemographicsVisible', ifDemographicsVisible)
  .controller('PatientDetailController', PatientDetailController)
  .factory('PatientListController', patientListControllerFactory)
  .factory('PatientModel', patientModelFactory)
  .factory('toggleDemographicsService', toggleDemographicsService)
  .directive('toggleDemographics', toggleDemographics)
  .name;
