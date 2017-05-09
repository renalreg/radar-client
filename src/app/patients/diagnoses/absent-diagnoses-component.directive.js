import templateUrl from './absent-diagnoses-component.html';

function absentDiagnosesControllerFactory(
  ModelListDetailController,
  PatientDiagnosisPermission,
  $injector,
) {
  function AbsentDiagnosesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientDiagnosisPermission($scope.patient)
      }
    });

  }

  AbsentDiagnosesController.$inject = ['$scope'];
  AbsentDiagnosesController.prototype = Object.create(ModelListDetailController.prototype);

  return AbsentDiagnosesController;
}

absentDiagnosesControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientDiagnosisPermission',
  '$injector'
];

function absentDiagnosesComponent(AbsentDiagnosesController) {
  return {
    scope: {
      patient: '='
    },
    controller: AbsentDiagnosesController,
    templateUrl: templateUrl
  };
}

absentDiagnosesComponent.$inject = ['AbsentDiagnosesController'];

export {
  absentDiagnosesControllerFactory,
  absentDiagnosesComponent
}
