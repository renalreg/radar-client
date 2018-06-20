import _ from 'lodash';

import templateUrl from './baseline-assessment-component.html';

function rituximabBaselineAssessmentPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

rituximabBaselineAssessmentPermissionFactory.$inject = ['PatientObjectPermission'];

function rituximabBaselineAssessmentControllerFactory(
  ModelDetailController,
  RituximabBaselineAssessmentPermission,
  firstPromise,
  $injector,
  store
) {
  function RituximabBaselineAssessmentController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        permission: new RituximabBaselineAssessmentPermission($scope.patient)
      }
    });

    $scope.multiple = false;

    $scope.previousAvailable = function() {
      return !_.isEmpty($scope.item.previousTreatment);
    };

    self.load(firstPromise([
      store.findFirst('rituximab-baseline-assessment', {patient: $scope.patient.id}),
      store.findMany('rituximab-treatment-options').then(function(rtxTreatmentOptions) {
        $scope.rtxTreatmentOptions = rtxTreatmentOptions;
      }),
      store.findMany('rituximab-performance-options').then(function(rtxPerformanceOptions) {
        $scope.rtxPerformanceOptions = rtxPerformanceOptions;
      }),
      store.findMany('rituximab-nephropathies-list').then(function(nephropathiesList) {
        $scope.patientNephropathiesList = nephropathiesList;
      }),
      store.findMany('rituximab-supportive-medication-list').then(function(supportiveMedicationList) {
        $scope.supportiveMedicationList = supportiveMedicationList;
      })
    ])).then(function() {
      self.view();
    });

    $scope.create = function() {
      var item = store.create('rituximab-baseline-assessment', {patient: $scope.patient.id});
      self.edit(item);
    };

  }

  RituximabBaselineAssessmentController.$inject = ['$scope'];
  RituximabBaselineAssessmentController.prototype = Object.create(ModelDetailController.prototype);

  return RituximabBaselineAssessmentController;
}

rituximabBaselineAssessmentControllerFactory.$inject = [
  'ModelDetailController',
  'RituximabBaselineAssessmentPermission',
  'firstPromise',
  '$injector',
  'store'
];

function rituximabBaselineAssessmentComponent(RituximabBaselineAssessmentController) {
  return {
    scope: {
      patient: '='
    },
    controller: RituximabBaselineAssessmentController,
    templateUrl: templateUrl
  };
}

rituximabBaselineAssessmentComponent.$inject = ['RituximabBaselineAssessmentController'];

export {
  rituximabBaselineAssessmentPermissionFactory,
  rituximabBaselineAssessmentControllerFactory,
  rituximabBaselineAssessmentComponent
};
