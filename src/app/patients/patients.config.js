(function() {
  'use strict';

  var app = angular.module('radar.patients');

  app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('patients', {
      url: '/patients',
      templateUrl: 'app/patients/patient-list.html',
      controller: ['$scope', '$controller', 'PatientListController', function($scope, $controller, PatientListController) {
        $controller(PatientListController, {$scope: $scope});
      }]
    });

    $stateProvider.state('patient', {
      url: '/patients/:patientId',
      abstract: true,
      templateUrl: 'app/patients/patient-detail.html',
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
      templateUrl: 'app/patients/all.html'
    });

    $stateProvider.state('patient.delete', {
      url: '/delete',
      templateUrl: 'app/patients/delete-patient.html',
      controller: 'DeletePatientController'
    });
  }]);

  app.factory('patientPages', ['_', function(_) {
    function patientPage(name, state, cohort) {
      if (cohort === undefined) {
        cohort = false;
      }

      var stateParams = {
        patientId: 'patient.id'
      };

      if (cohort) {
        stateParams.cohortId = 'cohort.id';
      }

      state = state + '({' + _.map(stateParams, function(v, k) {
        return k + ': ' + v;
      }).join(', ') + '})';

      return {
        name: name,
        state: state
      };
    }

    return {
      ADDRESSES: patientPage('Addresses', 'patient.addresses'),
      ALIASES: patientPage('Aliases', 'patient.aliases'),
      ALPORT_CLINICAL_PICTURES: patientPage('Clinical Pictures', 'patient.alportClinicalPictures'),
      DEMOGRAPHICS: patientPage('Demographics', 'patient.demographics'),
      DIAGNOSES: patientPage('Comorbidities', 'patient.diagnoses', true),
      DIALYSIS: patientPage('Dialysis', 'patient.dialysis'),
      COHORTS: patientPage('Cohorts', 'patient.cohorts'),
      CONSULTANTS: patientPage('Consultants', 'patient.consultants'),
      FAMILY_HISTORY: patientPage('Family History', 'patient.familyHistory', true),
      FETAL_ANOMALY_SCANS: patientPage('Fetal Anomaly Scans', 'patient.fetalAnomalyScans'),
      FETAL_ULTRASOUNDS: patientPage('Fetal Ultrasounds', 'patient.fetalUltrasounds'),
      FUAN_CLINICAL_PICTURES: patientPage('Clinical Pictures', 'patient.fuanClinicalPictures'),
      GENETICS: patientPage('Genetics', 'patient.genetics', true),
      HNF1B_CLINICAL_PICTURES: patientPage('Clinical Pictures', 'patient.hnf1bClinicalPictures'),
      HOSPITALISATIONS: patientPage('Hospitalisations', 'patient.hospitalisations'),
      HOSPITALS: patientPage('Hospitals', 'patient.hospitals'),
      INS_CLINICAL_PICTURES: patientPage('Clinical Pictures', 'patient.insClinicalPictures'),
      INS_RELAPSES: patientPage('Relapses', 'patient.insRelapses'),
      LIVER_DISEASES: patientPage('Liver Diseases', 'patient.liverDiseases'),
      LIVER_IMAGING: patientPage('Liver Imaging', 'patient.liverImaging'),
      LIVER_TRANSPLANTS: patientPage('Liver Transplants', 'patient.liverTransplants'),
      MEDICATIONS: patientPage('Medications', 'patient.medications'),
      META: patientPage('Metadata', 'patient.metadata'),
      MPGN_CLINICAL_PICTURES: patientPage('Clinical Pictures', 'patient.mpgnClinicalPictures'),
      NEPHRECTOMIES: patientPage('Nephrectomies', 'patient.nephrectomies'),
      NUMBERS: patientPage('Numbers', 'patient.numbers'),
      NUTRITION: patientPage('Nutrition', 'patient.nutrition'),
      QUESTIONNAIRES: patientPage('Questionnaires', 'patient.forms'),
      PATHOLOGY: patientPage('Pathology', 'patient.pathology'),
      PLASMAPHERESIS: patientPage('Plasmapheresis', 'patient.plasmapheresis'),
      PREGNANCIES: patientPage('Pregnancies', 'patient.pregnancies'),
      PRIMARY_DIAGNOSIS: patientPage('Primary Diagnosis', 'patient.primaryDiagnosis', true),
      RENAL_IMAGING: patientPage('Renal Imaging', 'patient.renalImaging'),
      RENAL_PROGRESSION: patientPage('Renal Disease Progression', 'patient.renalProgression'),
      RESULTS: patientPage('Results', 'patient.results'),
      SALT_WASTING_CLINICAL_FEATURES: patientPage('Clinical Features', 'patient.saltWastingClinicalFeatures'),
      TRANSPLANTS: patientPage('Kidney Transplants', 'patient.transplants')
    };
  }]);
})();
