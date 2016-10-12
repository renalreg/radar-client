import templateUrl from './addresses-component.html';

function patientAddressPermissionFactory(PatientSystemObjectPermission) {
  return PatientSystemObjectPermission;
}

patientAddressPermissionFactory.$inject = ['PatientSystemObjectPermission'];

function patientAddressesControllerFactory(
  ModelListDetailController,
  PatientAddressPermission,
  firstPromise,
  getRadarGroup,
  $injector,
  store
) {
  /**
   * Each patient can have multiple addresses. Each record has a from and to date
   * which are the dates the patient moved in and moved out respectively.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
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
      // Set the default country to Great Britain
      var item = store.create('patient-addresses', {
        patient: $scope.patient.id,
        country: {id: 'GB'},
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
