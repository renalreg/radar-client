import templateUrl from './baseline-assessment-component.html';

function rituximabBaselineAssessmentPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

rituximabBaselineAssessmentPermissionFactory.$inject = ['PatientObjectPermission'];

function rituximabBaselineAssessmentControllerFactory(
  ModelListDetailController,
  InsRelapsePermission,
  firstPromise,
  $injector,
  store
) {
  function RituximabBaselineAssessmentController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new InsRelapsePermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('ins-relapses', {patient: $scope.patient.id}),
      store.findMany('ins-kidney-types').then(function(kidneyTypes) {
        $scope.kidneyTypes = kidneyTypes;
      }),
      store.findMany('ins-remission-types').then(function(remissionTypes) {
        $scope.remissionTypes = remissionTypes;
      })
    ]));

    $scope.create = function() {
      var item = store.create('ins-relapses', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  RituximabBaselineAssessmentController.$inject = ['$scope'];
  RituximabBaselineAssessmentController.prototype = Object.create(ModelListDetailController.prototype);

  return RituximabBaselineAssessmentController;
}

rituximabBaselineAssessmentControllerFactory.$inject = [
  'ModelListDetailController',
  'InsRelapsePermission',
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

rituximabBaselineAssessmentComponent.$inject = ['rituximabBaselineAssessmentController'];

export {
  rituximabBaselineAssessmentPermissionFactory,
  rituximabBaselineAssessmentControllerFactory,
  rituximabBaselineAssessmentComponent
};
