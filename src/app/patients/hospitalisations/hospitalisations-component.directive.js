import templateUrl from './hospitalisations-component.html';

function hospitalisationPermissionFactory(PatientSourceObjectPermission) {
  return PatientSourceObjectPermission;
}

hospitalisationPermissionFactory.$inject = ['PatientSourceObjectPermission'];

function hospitalisationsControllerFactory(
  ModelListDetailController,
  HospitalisationPermission,
  $injector,
  store
) {
  function HospitalisationsController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new HospitalisationPermission($scope.patient)
      }
    });

    self.load(store.findMany('hospitalisations', {patient: $scope.patient.id}));

    $scope.create = function() {
      var item = store.create('hospitalisations', {patient: $scope.patient.id});
      self.edit(item);
    };
  }

  HospitalisationsController.$inject = ['$scope'];
  HospitalisationsController.prototype = Object.create(ModelListDetailController.prototype);

  return HospitalisationsController;
}

hospitalisationsControllerFactory.$inject = [
  'ModelListDetailController',
  'HospitalisationPermission',
  '$injector',
  'store'
];

function hospitalisationsComponent(HospitalisationsController) {
  return {
    scope: {
      patient: '='
    },
    controller: HospitalisationsController,
    templateUrl: templateUrl
  };
}

hospitalisationsComponent.$inject = ['HospitalisationsController'];

export {
  hospitalisationPermissionFactory,
  hospitalisationsControllerFactory,
  hospitalisationsComponent
};
