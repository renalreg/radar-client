import templateUrl from './nurturedata-component.html';

function patientNurtureDataPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

patientNurtureDataPermissionFactory.$inject = ['PatientObjectPermission'];

function patientNurtureDataControllerFactory(
  ModelDetailController,
  PatientNurtureDataPermission,
  $injector,
  store
) {
  /**
   * A component for recording nurturedata about the patient (for example comments).
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PatientNurtureDataController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientNurtureDataPermission($scope.patient),
      },
    });

    $scope.nurtureOptions = ["Yes", "No"]

    var shortNames = [];
    for (let group of $scope.patient.groups) {
      shortNames.push(group.group.shortName);
    }
    $scope.groupShortNames = shortNames;

    var signedOffStatesPromise = store
      .findMany('signedOffStates')
      .then(function (signedOffStates) {
        $scope.signedOffStates = signedOffStates;
        $scope.INSSignedOffStates = signedOffStates.filter(function (value) {
          return value.label != 'Baseline complete, no FUP as Tx or dialysis';
        });
      });

    self.load($scope.patient).then(function () {
      self.view();
    });
    signedOffStatesPromise;
  }

  PatientNurtureDataController.$inject = ['$scope'];
  PatientNurtureDataController.prototype = Object.create(
    ModelDetailController.prototype
  );

  return PatientNurtureDataController;
}

patientNurtureDataControllerFactory.$inject = [
  'ModelDetailController',
  'PatientNurtureDataPermission',
  '$injector',
  'store',
];

function patientNurtureDataComponent(PatientNurtureDataController) {
  return {
    scope: {
      patient: '=',
    },
    controller: PatientNurtureDataController,
    templateUrl: templateUrl,
  };
}

patientNurtureDataComponent.$inject = ['PatientNurtureDataController'];

export {
  patientNurtureDataPermissionFactory,
  patientNurtureDataControllerFactory,
  patientNurtureDataComponent,
};
