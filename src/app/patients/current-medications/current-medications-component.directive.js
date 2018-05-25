import templateUrl from './current-medications-component.html';

function currentMedicationPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

currentMedicationPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function currentMedicationsControllerFactory(
  ModelListDetailController,
  CurrentMedicationPermission,
  firstPromise,
  $injector,
  store
) {
  /**
   * A component for recording a patient's current medications. It is a record what a patient is
   * currently taking, not prescriptions.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function CurrentMedicationsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new CurrentMedicationPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('current-medications', {patient: $scope.patient.id}),
      store.findMany('medication-dose-units').then(function(doseUnits) {
        $scope.doseUnits = doseUnits;
      }),
      store.findMany('medication-routes').then(function(routes) {
        $scope.routes = routes;
      })
    ]));

    $scope.create = function() {
      var item = store.create('current-medications', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  CurrentMedicationsController.$inject = ['$scope'];
  CurrentMedicationsController.prototype = Object.create(ModelListDetailController.prototype);

  return CurrentMedicationsController;
}

currentMedicationsControllerFactory.$inject = [
  'ModelListDetailController',
  'CurrentMedicationPermission',
  'firstPromise',
  '$injector',
  'store'
];

function currentMedicationsComponent(CurrentMedicationsController) {
  return {
    scope: {
      patient: '='
    },
    controller: CurrentMedicationsController,
    templateUrl: templateUrl
  };
}

currentMedicationsComponent.$inject = ['CurrentMedicationsController'];

export {
  currentMedicationPermissionFactory,
  currentMedicationsControllerFactory,
  currentMedicationsComponent
};
