import templateUrl from './renal-progression-component.html';

function renalProgressionPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

renalProgressionPermissionFactory.$inject = ['PatientObjectPermission'];

function renalProgressionControllerFactory(
  ModelDetailController,
  RenalProgressionPermission,
  $injector,
  store
) {
  /**
   * A component for recording the date when a patient was diagnosed with ESRF.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function RenalProgressionController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        permission: new RenalProgressionPermission($scope.patient)
      }
    });

    self.load(store.findFirst('renal-progressions', {patient: $scope.patient.id})).then(function() {
      self.view();
    });

    $scope.create = function() {
      var item = store.create('renal-progressions', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  RenalProgressionController.$inject = ['$scope'];
  RenalProgressionController.prototype = Object.create(ModelDetailController.prototype);

  return RenalProgressionController;
}

renalProgressionControllerFactory.$inject = [
  'ModelDetailController',
  'RenalProgressionPermission',
  '$injector',
  'store'
];

function renalProgressionComponent(RenalProgressionController) {
  return {
    scope: {
      patient: '='
    },
    controller: RenalProgressionController,
    templateUrl: templateUrl
  };
}

renalProgressionComponent.$inject = ['RenalProgressionController'];

export {
  renalProgressionPermissionFactory,
  renalProgressionControllerFactory,
  renalProgressionComponent
};
