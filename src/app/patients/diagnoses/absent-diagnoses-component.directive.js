import templateUrl from './absent-diagnoses-component.html';

function absentDiagnosesControllerFactory(
  getRadarGroup,
  $injector,
  $q,
  store,
  adapter,
  $state
) {
  function AbsentDiagnosesController($scope) {

    $scope.items = [];
    $scope.item = {}

    $scope.submit = function() {
      var data = $scope.item;
      data['patient'] = $scope.patient.id
      data['group'] = $scope.item.sourceGroup.id;

      return adapter.post('/absent-diagnoses', {}, data)
        .catch()
        .then(function() {
          $state.reload();
      });
    }
  }

  AbsentDiagnosesController.$inject = ['$scope'];

  return AbsentDiagnosesController;
}

absentDiagnosesControllerFactory.$inject = [
  'getRadarGroup',
  '$injector',
  '$q',
  'store',
  'adapter',
  '$state'
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
