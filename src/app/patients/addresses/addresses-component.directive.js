import templateUrl from './addresses-component.html';

function patientAddressPermissionFactory(PatientRadarObjectPermission) {
  return PatientRadarObjectPermission;
}

patientAddressPermissionFactory.$inject = ['PatientRadarObjectPermission'];

function patientAddressesControllerFactory(
  ModelListDetailController,
  PatientAddressPermission,
  firstPromise,
  getRadarGroup,
  $injector,
  store
) {
  function PatientAddressesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientAddressPermission($scope.patient)
      }
    });

    $scope.sourceGroup = null;

    self.load(firstPromise([
      store.findMany('patient-addresses', {patient: $scope.patient.id}),
      store.findMany('countries').then(function(countries) {
        $scope.countries = countries;
      }),
      getRadarGroup().then(function(group) {
        $scope.sourceGroup = group;
      })
    ]));

    $scope.create = function() {
      var item = store.create('patient-addresses', {
        patient: $scope.patient.id,
        country: {id: 'UK'},
        sourceGroup: $scope.sourceGroup
      });
      self.edit(item);
    };
  }

  PatientAddressesController.$inject = ['$scope'];
  PatientAddressesController.prototype = Object.create(ModelListDetailController.prototype);

  return PatientAddressesController;
}

patientAddressesControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientAddressPermission',
  'firstPromise',
  'getRadarGroup',
  '$injector',
  'store'
];

function patientAddressesComponent(PatientAddressesController) {
  return {
    scope: {
      patient: '='
    },
    controller: PatientAddressesController,
    templateUrl: templateUrl
  };
}

patientAddressesComponent.$inject = ['PatientAddressesController'];

export {
  patientAddressPermissionFactory,
  patientAddressesControllerFactory,
  patientAddressesComponent
};
