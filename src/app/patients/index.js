import angular from 'angular';

import addresses from './addresses';
import aliases from './aliases';
import alport from './alport';
import cohorts from './cohorts';
import consultants from './consultants';
import demographics from './demographics';
import diagnoses from './diagnoses';
import dialysis from './dialysis';
import familyHistory from './family-history';
import fetalUltrasounds from './fetal-ultrasounds';
import fuan from './fuan';
import genetics from './genetics';
import hnf1b from './hnf1b';
import hospitalisations from './hospitalisations';
import hospitals from './hospitals';
import ins from './ins';
import pkd from './pkd';
import medications from './medications';
import metadata from './metadata';
import mpgn from './mpgn';
import navigation from './navigation';
import nephrectomies from './nephrectomies';
import numbers from './numbers';
import pathology from './pathology';
import plasmapheresis from './plasmapheresis';
import pregnancies from './pregnancies';
import renalProgression from './renal-progression';
import renalImaging from './renal-imaging';
import results from './results';
import saltWasting from './salt-wasting';
import transplants from './transplants';

import patientListTemplateUrl from './patient-list.html';
import patientDetailTemplateUrl from './patient-detail.html';
import allTemplateUrl from './all.html';
import deletePatientTemplateUrl from './delete-patient.html';

function config($stateProvider) {
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

config.$inject = ['$stateProvider'];

export default angular.module('radar.patients', [
  addresses,
  aliases,
  alport,
  cohorts,
  consultants,
  demographics,
  diagnoses,
  dialysis,
  familyHistory,
  fetalUltrasounds,
  fuan,
  genetics,
  hnf1b,
  hospitalisations,
  hospitals,
  ins,
  pkd,
  medications,
  metadata,
  mpgn,
  navigation,
  nephrectomies,
  numbers,
  pathology,
  plasmapheresis,
  pregnancies,
  renalProgression,
  renalImaging,
  results,
  saltWasting,
  transplants
])
  .config(config)
  .name;
