import templateUrl from './metadata-component.html';

function patientMetadataPermissionFactory(PatientObjectPermission) {
  return PatientObjectPermission;
}

patientMetadataPermissionFactory.$inject = ['PatientObjectPermission'];

function patientMetadataControllerFactory(
  ModelDetailController,
  PatientMetadataPermission,
  $injector
) {
  /**
   * A component for recording metadata about the patient (for example comments).
   *
   * @class
   * @param {Object} $scope - angular scope.
   */
  function PatientMetadataController($scope) {
    var self = this;

    $injector.invoke(ModelDetailController, self, {
      $scope: $scope,
      params: {
        permission: new PatientMetadataPermission($scope.patient),
      },
    });

    var shortNames = [];
    for (let group of $scope.patient.groups) {
      shortNames.push(group.group.shortName);
    }
    $scope.groupShortNames = shortNames;

    self.load($scope.patient).then(function () {
      self.view();
    });
  }

  PatientMetadataController.$inject = ['$scope'];
  PatientMetadataController.prototype = Object.create(
    ModelDetailController.prototype
  );

  return PatientMetadataController;
}

patientMetadataControllerFactory.$inject = [
  'ModelDetailController',
  'PatientMetadataPermission',
  '$injector',
];

function patientMetadataComponent(PatientMetadataController) {
  return {
    scope: {
      patient: '=',
    },
    controller: PatientMetadataController,
    templateUrl: templateUrl,
  };
}

patientMetadataComponent.$inject = ['PatientMetadataController'];

export {
  patientMetadataPermissionFactory,
  patientMetadataControllerFactory,
  patientMetadataComponent,
};
