import templateUrl from './aliases-component.html';

function patientAliasPermissionFactory(PatientRadarObjectPermission) {
  return PatientRadarObjectPermission;
}

patientAliasPermissionFactory.$inject = ['PatientRadarObjectPermission'];

function patientAliasesControllerFactory(
  ModelListDetailController,
  PatientAliasPermission,
  firstPromise,
  getRadarGroup,
  $injector,
  store
) {
  /**
   * Each patient can have multiple aliases. An alias is another name the patient
   * is known by. This is useful for recording maiden names, name changes, or mispellings.
   * Aliases are searchable in the patient list.
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PatientAliasesController($scope) {
    var self = this;

    $injector.invoke(ModelListDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientAliasPermission($scope.patient)
      }
    });

    self.load(firstPromise([
      store.findMany('patient-aliases', {patient: $scope.patient.id}),
      getRadarGroup().then(function(group) {
        $scope.sourceGroup = group;
      })
    ]));

    $scope.create = function() {
      var item = store.create('patient-aliases', {
        patient: $scope.patient.id,
        sourceGroup: $scope.sourceGroup
      });

      self.edit(item);
    };
  }

  PatientAliasesController.$inject = ['$scope'];
  PatientAliasesController.prototype = Object.create(ModelListDetailController.prototype);

  return PatientAliasesController;
}

patientAliasesControllerFactory.$inject = [
  'ModelListDetailController',
  'PatientAliasPermission',
  'firstPromise',
  'getRadarGroup',
  '$injector',
  'store'
];

function patientAliasesComponent(PatientAliasesController) {
  return {
    scope: {
      patient: '='
    },
    controller: PatientAliasesController,
    templateUrl: templateUrl
  };
}

patientAliasesComponent.$inject = ['PatientAliasesController'];

export {
  patientAliasPermissionFactory,
  patientAliasesControllerFactory,
  patientAliasesComponent
};
