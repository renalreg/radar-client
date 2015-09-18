(function() {
  'use strict';

  var app = angular.module('radar.patients.diagnoses');

  app.factory('DiagnosisPermission', function(PatientObjectPermission) {
    return PatientObjectPermission;
  });

  app.factory('DiagnosesController', function(ListDetailController, DiagnosisPermission, firstPromise) {
    function DiagnosesController($scope, $injector, store) {
      var self = this;

      $injector.invoke(ListDetailController, self, {
        $scope: $scope,
        params: {
          permission: new DiagnosisPermission($scope.patient)
        }
      });

      self.load(firstPromise([
        store.findMany('diagnoses', {patient: $scope.patient.id, cohort: $scope.cohort.id}),
        store.findMany('medication-dose-units').then(function(doseUnits) {
          $scope.doseUnits = doseUnits;
        }),
        store.findMany('diagnosis-cohort-diagnoses').then(function(cohortDiagnoses) {
          $scope.cohortDiagnoses = cohortDiagnoses;
        }),
        store.findMany('diagnosis-biopsy-diagnoses').then(function(biopsyDiagnoses) {
          $scope.biopsyDiagnoses = biopsyDiagnoses;
        }),
        store.findMany('diagnosis-karyotypes').then(function(karyotypes) {
          $scope.karyotypes = karyotypes;
        })
      ]));

      $scope.create = function() {
        var item = store.create('diagnoses', {patient: $scope.patient.id, cohort: $scope.cohort});
        self.edit(item);
      };
    }

    DiagnosesController.prototype = Object.create(ListDetailController.prototype);

    return DiagnosesController;
  });

  app.directive('diagnosesComponent', function(DiagnosesController) {
    return {
      scope: {
        patient: '=',
        cohort: '='
      },
      controller: DiagnosesController,
      templateUrl: 'app/patients/diagnoses/diagnoses-component.html'
    };
  });
})();