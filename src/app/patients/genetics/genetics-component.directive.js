import templateUrl from './genetics-component.html';

function geneticsPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

geneticsPermissionFactory.$inject = ['PatientObjectPermission'];

function geneticsControllerFactory(
  ModelListDetailController,
  GeneticsPermission,
  $injector,
  store,
  firstPromise
) {
  function GeneticsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new GeneticsPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('genetics', {patient: $scope.patient.id, group: $scope.cohort.id}),
      store.findMany('genetics-karyotypes').then(function(karyotypes) {
        $scope.karyotypes = karyotypes;
      })
    ]));

    $scope.create = function() {
      var item = store.create('genetics', {patient: $scope.patient.id, group: $scope.cohort});
      self.edit(item);
    };
  }

  GeneticsController.$inject = ['$scope'];
  GeneticsController.prototype = Object.create(ModelListDetailController.prototype);

  return GeneticsController;
}

geneticsControllerFactory.$inject = [
  'ModelListDetailController',
  'GeneticsPermission',
  '$injector',
  'store',
  'firstPromise'
];

function geneticsComponent(GeneticsController) {
  return {
    scope: {
      patient: '=',
      cohort: '='
    },
    controller: GeneticsController,
    templateUrl: templateUrl
  };
}

geneticsComponent.$inject = ['GeneticsController'];

export {
  geneticsPermissionFactory,
  geneticsControllerFactory,
  geneticsComponent
};
