import templateUrl from './medications-component.html';

function medicationPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

medicationPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function medicationsControllerFactory(
  ModelListDetailController,
  MedicationPermission,
  firstPromise,
  $injector,
  store
) {
  function MedicationsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new MedicationPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('medications', {patient: $scope.patient.id}),
      store.findMany('medication-dose-units').then(function(doseUnits) {
        $scope.doseUnits = doseUnits;
      }),
      store.findMany('medication-routes').then(function(routes) {
        $scope.routes = routes;
      })
    ]));

    $scope.create = function() {
      var item = store.create('medications', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  MedicationsController.$inject = ['$scope'];
  MedicationsController.prototype = Object.create(ModelListDetailController.prototype);

  return MedicationsController;
}

medicationsControllerFactory.$inject = [
  'ModelListDetailController',
  'MedicationPermission',
  'firstPromise',
  '$injector',
  'store'
];

function medicationsComponent(MedicationsController) {
  return {
    scope: {
      patient: '='
    },
    controller: MedicationsController,
    templateUrl: templateUrl
  };
}

medicationsComponent.$inject = ['MedicationsController'];

export {
  medicationPermissionFactory,
  medicationsControllerFactory,
  medicationsComponent
};
