import templateUrl from './nurture-data-component.html';

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
   * A component for recording nurture-data about the patient (for example comments).
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

    var shortNames = [];
    for (let group of $scope.patient.groups) {
      shortNames.push(group.group.shortName);
    }
    $scope.groupShortNames = shortNames;

    self
      .load(
        store.findOne('nurture-data', $scope.patient.nurtureData.id),
        store.findMany('signed-off-states').then(function (signedOffStates) {
          $scope.signedOffStates = signedOffStates;
        })
      )
      .then(function () {
        self.view();
      });
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
